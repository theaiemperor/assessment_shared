import z, { ZodString } from "zod"



export const AuthMainZ = z.object({
    email: (z.email("Please use a valid email address.") as unknown as ZodString)
        .trim()
        .toLowerCase(),

    password: z.string()
        .min(6, "Minimum password length must be 6.")
        .max(128, "Password is too long, please use small password."),

    img: z.url()
        .optional(),

    role: z.enum(['business', 'candidate', 'admin'])
        .default('candidate'),

    referBy: z.string()
        .optional(),

    tags: z.array(z.string())
        .default(['email_unverified']),

    createdAt: z.date()
        .default(() => new Date()),

    updatedAt: z.date()
        .default(() => new Date())
})


export type IAuthMain = z.infer<typeof AuthMainZ>;