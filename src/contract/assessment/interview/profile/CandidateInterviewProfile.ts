import { getReq, postReq, putReq } from "../../../../client/lib/axios/apiCall.js";
import { CandidateInterviewProfileCoreZ, CandidateInterviewProfileZ } from "../../../../schema/assessments/interview/profile/CandidateInterviewProfile.js";
import { createResponseTemplate } from "../../../../server/lib/express/response/apiResponse.js";
import { CandidateInterviewProfileCreateZ, CandidateInterviewProfileUpdateZ, ICandidateInterviewProfileClientZ, ICandidateInterviewProfileCreateZ, ICandidateInterviewProfileUpdateZ } from "./schema.js";


export const BuilderProfile = {
    server: {
        create: createResponseTemplate<ICandidateInterviewProfileClientZ, typeof CandidateInterviewProfileCreateZ>(CandidateInterviewProfileCreateZ),
        get: createResponseTemplate<ICandidateInterviewProfileClientZ>(),
        update: createResponseTemplate<ICandidateInterviewProfileClientZ, typeof CandidateInterviewProfileUpdateZ>(CandidateInterviewProfileUpdateZ)
    },

    client: {
        create: postReq<ICandidateInterviewProfileCreateZ, ICandidateInterviewProfileClientZ>,
        get: getReq<ICandidateInterviewProfileClientZ>,
        update: putReq<ICandidateInterviewProfileUpdateZ, ICandidateInterviewProfileClientZ>
    },

    schemas: {
        CandidateInterviewProfileCoreZ,
        CandidateInterviewProfileZ,
        CandidateInterviewProfileCreateZ,
        CandidateInterviewProfileUpdateZ,
    }
}
