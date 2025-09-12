import { getReq, postReq, putReq } from "../../../../../client/lib/axios/apiCall.js";
import { AIInterviewCoreZ, AIInterviewZ, IAIInterviewZ } from "../../../../../schema/assessments/interview/ai/Description.js";
import { createResponseTemplate } from "../../../../../server/lib/express/response/apiResponse.js";
import { AIInterviewClientZ, AIInterviewCreateZ, AIInterviewUpdateZ, IAIInterviewClientZ } from "./type.js";

export const AIInterviewDescription = {
    server: {
        create: createResponseTemplate<IAIInterviewZ, typeof AIInterviewCreateZ>(AIInterviewCreateZ),
        get: createResponseTemplate<IAIInterviewZ>(),
        update: createResponseTemplate<IAIInterviewZ, typeof AIInterviewUpdateZ>(AIInterviewUpdateZ)
    },

    client: {
        create: postReq<IAIInterviewClientZ>,
        get: getReq<IAIInterviewClientZ>,
        update: putReq<IAIInterviewClientZ>
    },

    schemas: {
        AIInterviewZ,
        AIInterviewCoreZ,
        AIInterviewCreateZ,
        AIInterviewUpdateZ,
        AIInterviewClientZ
    }
}
