import { getReq, postReq, putReq } from "../../../client/lib/axios/apiCall.js";
import { CandidateCoreZ, CandidateZ } from "../../../schema/users/candidate/candidateProfile.js";
import { createResponseTemplate } from "../../../server/lib/express/response/apiResponse.js";
import { CandidateCreateZ, CandidateUpdateZ, ICandidateClientZ, ICandidateCreateZ, ICandidateUpdateZ } from "./types.js";


export const CandidateProfile = {
    server: {
        create: createResponseTemplate<ICandidateClientZ, typeof CandidateCreateZ>(CandidateCreateZ),
        get: createResponseTemplate<ICandidateClientZ>(),
        update: createResponseTemplate<ICandidateClientZ, typeof CandidateUpdateZ>(CandidateUpdateZ)
    },

    client: {
        create: postReq<ICandidateCreateZ, ICandidateClientZ>,
        get: getReq<ICandidateClientZ>,
        update: putReq<ICandidateUpdateZ, ICandidateClientZ>
    },

    schemas: {
        CandidateZ,
        CandidateCoreZ,
        CandidateCreateZ,
        CandidateUpdateZ
    }
}
