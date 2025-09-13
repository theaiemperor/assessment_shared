import z from "zod"
import { AIInterviewConversationZ } from "../../../../../schema/assessments/interview/ai/Conversations.js"

const AIInterviewToken = z.object({
    interviewId: z.string(),
    conversationId: z.string(),
    order: z.number().min(1),
    roundId: z.string(),
    allRounds: z.array(z.object({
        _id: z.string(),
        title: z.string()
    })),
    flags: z.object({
        irrelevantScore: z.number(),
        cheatingScore: z.number(),
        unclearScore: z.number()
    }),
    status: AIInterviewConversationZ.shape.status
});

const AIInterviewUserResponse = z.object({
    token: z.string(),
    content: z.string()
});

const AIInterviewAIResponse = z.object({
    token: z.string(),
    question: z.string()
});

const AIInterviewStartNewRound = z.object({
    token: z.string()
});





export {
    AIInterviewToken,
    AIInterviewUserResponse,
    AIInterviewAIResponse,
    AIInterviewStartNewRound
};


export type IAInterviewToken = z.infer<typeof AIInterviewToken>;
export type IAIInterviewUserResponse = z.infer<typeof AIInterviewUserResponse>;
export type IAIInterviewAIResponse = z.infer<typeof AIInterviewAIResponse>;
export type IAIInterviewStartNewRound = z.infer<typeof AIInterviewStartNewRound>;

