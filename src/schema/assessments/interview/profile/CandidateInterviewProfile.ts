import z from "zod";
import CommonCollection from "../../../_shared/commonCollection.js";


export const CandidateInterviewProfileCoreZ = z.object({

    resume: z.url({ error: "Please Provide a valid url" })
        .max(2048, { error: 'URL cannot be so long' }),

    resumeContent: z.string(),

    experience: z.number()
        .min(0, { error: "Experience cannot be negative." })
        .max(50, { error: "It is too much experience to have." })
        .describe('Experience of the user in years'),

    bio: z.string()
        .min(10, { error: "Please provide some long bio." })
        .max(1000, { error: "Bio cannot be so long." })
        .describe('Professional and Good looking bio of the user which will be shown to interviewer'),

    skills: z.array(z.string())
        .min(1, { error: "Please provide minimum one skill" })
        .max(100, { error: "Please use short name for the skill" })
        .describe("Array of user's skills"),

    education: z.array(z.object({

        qualification: z.string({ error: "Please provide qualification, degree or diploma name." })
            .describe('What one get after completing this, what is qualification e.g. degree, diploma etc. for example P.H.D or Bechler of arts'),

        source: z.string({ error: "Please provide source from where you completed this degree" })
            .describe('It can be school, university, online course, any skill programme anything from there qualification was taken.'),

        year: z.number({ error: 'Year of completion required. it can be in future year if still pending.' })
            .describe('Year in which qualification completed or if it is still running then in which year it will be completed.')
    })),

    links: z.record(
        z.string(),
        z.url()
            .max(2048, { error: "URL cannot be so long" })
            .describe("user's social, portfolio or other account's url")
    ),

    history: z.array(z.object({
        role: z.string()
            .min(3, { error: "Please provide a long name" })
            .max(500, { error: "Please provide a short name" })
            .describe("What was the role candidate previously worked on."),

        workplace: z.string()
            .min(3, { error: "Please provide a long name" })
            .max(500, { error: "Please provide a short name" })
            .describe('Company/Society/Individual or at home for himself where candidate worked before.'),

        duration: z.number()
            .min(1, { error: "Minimum one month work is required to add in previous experience" })
            .max(350, { error: "This is too much time to spend in a single workplace" })
            .describe("In months how much candidates works")
    })),

    status: z.enum(['active', 'blocked', 'disabled'])
        .default('active')

})


export const CandidateInterviewProfileZ = z.object({
    ...CommonCollection.shape,
    ...CandidateInterviewProfileCoreZ.shape
})


export type ICandidateInterviewProfileCoreZ = z.infer<typeof CandidateInterviewProfileCoreZ>;
export type ICandidateInterviewProfileZ = z.infer<typeof CandidateInterviewProfileZ>;

