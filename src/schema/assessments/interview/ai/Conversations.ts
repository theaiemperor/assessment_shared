import z from "zod";
import CommonCollection from "../../../_shared/commonCollection.js";
import { createIdForSchema } from "../../../_shared/utils.js";



const AIInterviewConversationQuestionZ = z.object({
    order: z.number().min(1)
        .describe("Order of the question within the round."),

    question: z.string()
        .describe("The actual text of the question presented to the candidate."),

    personalized: z.string().optional(),

    info: z.object({

        reasons: z.array(z.string())
            .describe("Why this question was chosen (e.g., 'test JavaScript skills', 'check leadership under pressure')."),

        refs: z.array(z.string())
            .describe("References behind choosing this question (e.g., job description skill, resume entry, previous round answer)."),

        expectedAnswer: z.string()
            .describe("What an ideal or strong answer would look like, written in natural language (not a strict regex)."),

        difficulty: z.enum(["easy", "medium", "hard"])
            .describe("Relative difficulty level of the question."),

        skillTags: z.array(z.string())
            .describe("Skills/competencies this question maps to (e.g., 'React', 'Negotiation', 'Safety Awareness')."),

        evaluationCriteria: z.array(z.string())
            .describe("What aspects the evaluator/AI should look for in the answer (clarity, accuracy, creativity, confidence)."),
    }).optional()

});



const AIInterviewConversationAnswerZ = z.object({
    order: z.number().min(1),

    responseText: z.string()
        .optional()
        .describe("Candidate's text answer."),

    info: z.object({
        score: z.number()
            .min(0)
            .max(1)
            .describe('Answer score (0-1) for the candidate in this question. Higher means better.'),

        summary: z.string()
            .describe("AI's summary/explanation of candidate's answer."),

        improvements: z.array(z.string()).optional()
            .describe("AI's suggestions for improving the answer."),
    }).optional(),

    duration: z.number()
        .optional()
        .describe("Time taken (in seconds) to answer this question."),

    flag: z.enum(["irrelevant", "cheating", "unclear", "exceptional"])
        .optional()
        .describe("Optional labels to flag unusual or noteworthy answers (useful in training future models).")
});



const AIInterviewConversationCoreZ = z.object({
    
    ...createIdForSchema('interviewId'),
    ...createIdForSchema('candidateId'),

    screeningQuestions: z.array(AIInterviewConversationQuestionZ),

    screeningAnswers: z.array(AIInterviewConversationAnswerZ),

    questions: z.record(
        z.string()
            .length(24)
            .describe("Round ID from which each question belongs"),

        z.array(AIInterviewConversationQuestionZ).describe('A list of all the questions into this round')
    ),

    answers: z.record(
        z.string()
            .length(24)
            .describe("Round ID from which each answer belongs"),

        z.array(AIInterviewConversationAnswerZ)
    ).default({}),

    memory: z.array(z.string()),


    status: z.enum([

        // Lifecycle
        "pending",            // Created, not started
        "finished",           // A round finished
        "in_progress",        // Started but not finished
        "completed",          // Candidate finished all

        // Explicit exit
        "stopped_irresponsible", // Quit midway (rage quit)
        "stopped_builder",
        "stopped_admin",


        // Implicit exit
        "failed_screening",          // Failed in screening round
        "failed_cheating",           // Found cheating signs
        "failed_irrelevant",         // Continuous irrelevant answers
        "failed_expired",            // Running interview validation expired
        "failed_error",              // Failed due to technical errors

    ]),

    meta: z.map(z.string(), z.any()),

});

const AIInterviewConversationZ = z.object({
    ...CommonCollection.shape,
    ...AIInterviewConversationCoreZ.shape
});



export {
    AIInterviewConversationQuestionZ,
    AIInterviewConversationAnswerZ,
    AIInterviewConversationCoreZ,
    AIInterviewConversationZ,
}

export type IAIInterviewConversationQuestionZ = z.infer<typeof AIInterviewConversationQuestionZ>;
export type IAIInterviewConversationAnswerZ = z.infer<typeof AIInterviewConversationAnswerZ>;
export type IAIInterviewConversationCoreZ = z.infer<typeof AIInterviewConversationCoreZ>;
export type IAIInterviewConversationZ = z.infer<typeof AIInterviewConversationZ>;
