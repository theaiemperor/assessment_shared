import { getReq, postReq, putReq } from "../../client/lib/axios/apiCall.js";
import { AuthCoreZ, AuthZ } from "../../schema/auth/auth.js";
import { createResponseTemplate } from "../../server/lib/express/response/apiResponse.js";
import { AuthCreateZ, AuthUpdateZ, IAuthClientZ, IAuthCreateZ, IAuthUpdateZ } from "./schema.js";


export const AuthProfile = {

    server: {
        create: createResponseTemplate<IAuthClientZ, typeof AuthCreateZ>(AuthCreateZ),
        get: createResponseTemplate<IAuthClientZ>(),
        update: createResponseTemplate<IAuthClientZ, typeof AuthUpdateZ>(AuthUpdateZ),

    },

    client: {
        create: postReq<IAuthCreateZ, IAuthClientZ>,
        get: getReq<IAuthClientZ>,
        update: putReq<IAuthUpdateZ, IAuthClientZ>
    },

    schemas: {
        AuthCoreZ,
        AuthZ,
        AuthCreateZ,
        AuthUpdateZ
    }
}