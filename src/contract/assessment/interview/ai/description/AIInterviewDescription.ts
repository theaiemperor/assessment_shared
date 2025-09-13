import { getReq, postReq, putReq } from "../../../../../client/lib/axios/apiCall.js";
import { AIInterviewDescriptionCoreZ, AIInterviewDescriptionZ, IAIInterviewDescriptionZ } from "../../../../../schema/assessments/interview/ai/Description.js";
import { createResponseTemplate } from "../../../../../server/lib/express/response/apiResponse.js";
import { AIInterviewDescriptionCreateZ, AIInterviewDescriptionUpdateZ, IAIInterviewDescriptionClientZ, AIInterviewDescriptionClientZ } from "./schema.js";


export const AIInterviewDescription = {
    server: {
        create: createResponseTemplate<IAIInterviewDescriptionZ, typeof AIInterviewDescriptionCreateZ>(AIInterviewDescriptionCreateZ),
        get: createResponseTemplate<IAIInterviewDescriptionZ>(),
        update: createResponseTemplate<IAIInterviewDescriptionZ, typeof AIInterviewDescriptionUpdateZ>(AIInterviewDescriptionUpdateZ)
    },

    client: {
        create: postReq<IAIInterviewDescriptionClientZ>,
        get: getReq<IAIInterviewDescriptionClientZ>,
        update: putReq<IAIInterviewDescriptionClientZ>
    },

    schemas: {
        AIInterviewDescriptionZ,
        AIInterviewDescriptionCoreZ,
        AIInterviewDescriptionCreateZ,
        AIInterviewDescriptionUpdateZ,
        AIInterviewDescriptionClientZ
    }
}
