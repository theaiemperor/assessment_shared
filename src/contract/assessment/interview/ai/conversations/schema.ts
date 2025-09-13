import z from "zod";
import { AIInterviewConversationZ } from "../../../../../schema/assessments/interview/ai/Conversations.js";


const AIInterviewConversationClientZ = AIInterviewConversationZ.omit({
    memory: true,
    meta: true,
})

export type IAIInterviewConversationClientZ = z.infer<typeof AIInterviewConversationClientZ>;
