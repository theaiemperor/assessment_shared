import z from "zod"
import CommonCollection from "../../_shared/commonCollection.js"
import { createIdForSchema } from "../../_shared/utils.js";

export const CandidateCoreZ = z.object({

    ...createIdForSchema('authId'),

    name: z.string()
        .describe('Name of the profile holder'),

    phone: z.string()
        .min(3, { error: "Phone number cannot be too short." })
        .max(15, { error: "Phone number cannot be so long" })
        .describe('Phone number without country code'),

    city: z.string()
        .min(2, { error: "City cannot be too short." })
        .max(100, { error: "City cannot be too long." })
        .describe('City of the user'),

    country: z.string()
        .describe('Country of the user'),

    gender: z.string()
        .describe('Gender of the user')
        .optional(),

    bio: z.string()
        .min(10, { error: "Please provide some long bio." })
        .max(1000, { error: "Bio cannot be so long." })
        .describe('Professional and Good looking bio of the user shown to public'),
})


export const CandidateZ = z.object({
    ...CommonCollection.omit({ tags: true }).shape,
    ...CandidateCoreZ.shape
})


export type ICandidateCoreZ = z.infer<typeof CandidateCoreZ>;
export type ICandidateZ = z.infer<typeof CandidateZ>;
