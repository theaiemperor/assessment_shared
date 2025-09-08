import { AIInterviewConversationZ } from "../../../../../_db/mongo/interviews/AIInterview/Conversations.js";
import { getReq, postReq, putReq } from "../../../../../client/lib/axios/apiCall.js";
import { createResponseTemplate } from "../../../../lib/express/response/apiResponse.js";
import { AIInterviewRequest_UserZ, IAIInterview_AIResponseZ, IAIInterview_UserRequestZ, IAIInterviewTokenZ } from "./schema.js";


export const AIInterviewLive = {
    server: {

        startInterview: createResponseTemplate<IAIInterviewTokenZ>(),
        startRound: createResponseTemplate<IAIInterview_AIResponseZ, typeof AIInterviewRequest_UserZ>(AIInterviewRequest_UserZ),
        continueChat: createResponseTemplate<IAIInterview_AIResponseZ, typeof AIInterviewRequest_UserZ>(AIInterviewRequest_UserZ),
    },

    client: {
        startInterview: getReq<IAIInterview_AIResponseZ>,
        startRound: postReq<IAIInterview_UserRequestZ, IAIInterview_AIResponseZ>,
        continueChat: putReq<IAIInterview_UserRequestZ, IAIInterview_AIResponseZ>,
    },

    schemas: {
        AIInterviewConversationZ
    }
}
