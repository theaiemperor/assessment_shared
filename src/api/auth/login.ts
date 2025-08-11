import z from "zod";
import { AuthMainZ } from "./main.js";


export const AuthLoginZ = AuthMainZ.pick({
    email: true,
    password: true,
})

export type IAuthLogin = z.infer<typeof AuthLoginZ>;