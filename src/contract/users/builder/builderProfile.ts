import { getReq, postReq, putReq } from "../../../client/lib/axios/apiCall.js";
import { BuilderCoreZ, BuilderZ } from "../../../schema/users/builder/builderProfile.js";
import { createResponseTemplate } from "../../../server/lib/express/response/apiResponse.js";
import { BuilderCreateZ, BuilderUpdateZ, IBuilderClientZ, IBuilderCreateZ, IBuilderUpdateZ } from "./schema.js";


export const BuilderProfile = {
    server: {
        create: createResponseTemplate<IBuilderClientZ, typeof BuilderCreateZ>(BuilderCreateZ),
        get: createResponseTemplate<IBuilderClientZ>(),
        update: createResponseTemplate<IBuilderClientZ, typeof BuilderUpdateZ>(BuilderUpdateZ)
    },

    client: {
        create: postReq<IBuilderCreateZ, IBuilderClientZ>,
        get: getReq<IBuilderClientZ>,
        update: putReq<IBuilderUpdateZ, IBuilderClientZ>
    },

    schemas: {
        BuilderZ,
        BuilderCoreZ,
        BuilderCreateZ,
        BuilderUpdateZ
    }
}
