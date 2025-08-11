import z from "zod";
import { AuthMainZ } from "./main.js";


export const AuthResetZ = AuthMainZ.pick({
    password: true
}).extend({ 
    token: z.string().min(1,{error:"Please provide reset token."})
 })

export type IAuthReset = z.infer<typeof AuthResetZ>;