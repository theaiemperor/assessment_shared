import z, { ZodString } from "zod"
import CommonCollection from "../_shared/commonCollection.js";



export const AuthCoreZ = z.object({
    email: (z.email("Please use a valid email address.") as unknown as ZodString)
        .trim()
        .toLowerCase(),

    password: z.string()
        .min(6, "Minimum password length must be 6.")
        .max(128, "Password is too long, please use small password."),

    img: z.url()
        .optional(),

    role: z.enum(['builder', 'candidate', 'admin', 'demo', 'test', 'analytics', 'management']),

    referBy: z.string()
        .optional(),

    status: z.enum(["active", "disabled", "blocked", "removing", "deleted"])
        .default("active"),

    tags: z.array(z.string())
        .default(['email_unverified']),

});

export const AuthZ = z.object({
    ...CommonCollection.shape,
    ...AuthCoreZ.shape
})


export type IAuthCoreZ = z.infer<typeof AuthCoreZ>
export type IAuthZ = z.infer<typeof AuthZ>;
