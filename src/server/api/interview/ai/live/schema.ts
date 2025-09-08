import z from "zod"
import { AIInterviewConversationZ } from "../../../../../_db/mongo/interviews/AIInterview/Conversations.js";



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
})




const AIInterviewRequest_UserZ = z.object({
    token: z.string(),
    content: z.string()
})


const AIInterviewResponse_AIZ = AIInterviewToken.extend({
    token: z.string(),
    question: z.string()
})



type IAIInterview_AIResponseZ = z.infer<typeof AIInterviewResponse_AIZ>;
type IAIInterview_UserRequestZ = z.infer<typeof AIInterviewRequest_UserZ>;
type IAIInterviewTokenZ = z.infer<typeof AIInterviewToken>;


export {
    AIInterviewToken,
    AIInterviewRequest_UserZ,
    AIInterviewResponse_AIZ
}

export type {
    IAIInterview_AIResponseZ,
    IAIInterview_UserRequestZ,
    IAIInterviewTokenZ
}