import z from "zod"
import CommonSchema from "../../_shared/commonSchema.js"
import { createIdForSchema } from "../../_shared/utils.js";

export const CandidateCoreZ = z.object({

    name: z.string()
        .describe('Name of the profile holder'),

    phone: z.string()
        .min(3, "Phone number cannot be too short.")
        .max(15, "Phone number cannot be so long")
        .describe('Phone number without country code'),

    city: z.string()
        .min(2, "City cannot be too short.")
        .max(100, "City cannot be too long.")
        .describe('City of the user'),

    country: z.string()
        .describe('Country of the user'),

    gender: z.string()
        .describe('Gender of the user')
        .optional(),

    bio: z.string()
        .min(10, "Please provide some long bio.")
        .max(1000, "Bio cannot be so long.")
        .describe('Professional and Good looking bio of the user shown to public'),
}).merge(createIdForSchema('authId'))


export const CandidateZ = z.object({
    ...CommonSchema.omit({ tags: true }).shape,
    ...CandidateCoreZ.shape
})


export type ICandidateCoreZ = z.infer<typeof CandidateCoreZ>;
export type ICandidateZ = z.infer<typeof CandidateZ>;
