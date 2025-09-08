import z from "zod";
import { AIInterviewResultZ } from "../../../../../_db/mongo/interviews/AIInterview/Result.js";
import { getReq, patchReq } from "../../../../../client/lib/axios/apiCall.js";
import { createResponseTemplate } from "../../../../lib/express/response/apiResponse.js";
import { IAIInterviewResultZ, IAIInterviewResultClientZ } from "./type.js";


// Schema
const statusZ = AIInterviewResultZ.pick({ status: true });





export const AIInterviewResult = {
    server: {

        // admin
        adminGetResult: createResponseTemplate<IAIInterviewResultZ | IAIInterviewResultZ[]>(),

        // builder
        builderChangeStatus: createResponseTemplate<IAIInterviewResultZ, typeof statusZ>(statusZ),

        // public
        publicGetResult: createResponseTemplate<IAIInterviewResultClientZ>()

    },

    client: {

        adminGetResult: getReq<IAIInterviewResultZ>,
        adminGetResults: getReq<IAIInterviewResultZ[]>,

        builderChangeStatus: patchReq<z.infer<typeof statusZ>, IAIInterviewResultZ>,

        publicGetResult: getReq<IAIInterviewResultClientZ>
    },

    schemas:{
        AIInterviewResultZ
    }
}
