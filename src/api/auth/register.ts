import z from "zod";
import { AuthMainZ } from "./main.js";


export const AuthRegisterZ = AuthMainZ.pick({
    email: true,
    password: true,
    referBy: true,
    role: true,
})

export type IAuthRegister = z.infer<typeof AuthRegisterZ>;