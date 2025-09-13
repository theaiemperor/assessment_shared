import { getReq } from "../../../../../client/lib/axios/apiCall.js";
import { AIInterviewConversationAnswerZ, AIInterviewConversationCoreZ, AIInterviewConversationQuestionZ, AIInterviewConversationZ } from "../../../../../schema/assessments/interview/ai/Conversations.js";
import { createResponseTemplate } from "../../../../../server/lib/express/response/apiResponse.js";
import { IAIInterviewConversationClientZ } from "./schema.js";

export const AIInterviewConversation = {
    server: {
        get: createResponseTemplate<IAIInterviewConversationClientZ>(),
    },
    client: {
        get: getReq<IAIInterviewConversationClientZ>,
    },
    schemas: {
        AIInterviewConversationZ,
        AIInterviewConversationCoreZ,
        AIInterviewConversationQuestionZ,
        AIInterviewConversationAnswerZ
    }
}
