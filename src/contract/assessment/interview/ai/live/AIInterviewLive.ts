import { getReq, postReq, putReq } from "../../../../../client/lib/axios/apiCall.js";
import { createResponseTemplate } from "../../../../../server/lib/express/response/apiResponse.js";
import { IObj } from "../../../../../types/common.js";
import { AIInterviewAIResponse, AIInterviewStartNewRound, AIInterviewToken, AIInterviewUserResponse, IAIInterviewAIResponse, IAInterviewToken } from "./schema.js";





export const AIInterviewLive = {
    server: {
        startInterview: createResponseTemplate<IAIInterviewAIResponse, undefined, IObj, IAInterviewToken>(),
        continueInterview: createResponseTemplate<IAIInterviewAIResponse, typeof AIInterviewUserResponse, IObj, IAInterviewToken>(AIInterviewUserResponse),
        startNewRound: createResponseTemplate<IAIInterviewAIResponse, typeof AIInterviewStartNewRound, IObj, IAInterviewToken>(AIInterviewStartNewRound),
    },

    client: {
        startInterview: getReq<IAIInterviewAIResponse, IObj, IAInterviewToken>,
        continueInterview: putReq<IAIInterviewAIResponse, IObj, IAInterviewToken>,
        startNewRound: postReq<IAIInterviewAIResponse, IObj, IAInterviewToken>
    },

    schemas: {
        AIInterviewToken,
        AIInterviewUserResponse,
        AIInterviewAIResponse,
        AIInterviewStartNewRound
    }
};