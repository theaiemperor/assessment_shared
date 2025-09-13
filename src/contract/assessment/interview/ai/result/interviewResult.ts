import { getReq } from "../../../../../client/lib/axios/apiCall.js";
import { AIInterviewResultCoreZ, AIInterviewResultZ } from "../../../../../schema/assessments/interview/ai/Result.js";

import { createResponseTemplate } from "../../../../../server/lib/express/response/apiResponse.js";
import { IAIInterviewResultClientZ } from "./schema.js";


export const AIInterviewResult = {
    
    server: {
        get: createResponseTemplate<IAIInterviewResultClientZ>(),
    },

    client: {
        get: getReq<IAIInterviewResultClientZ>,
    },

    schemas: {
        AIInterviewResultCoreZ,
        AIInterviewResultZ
    }
}
