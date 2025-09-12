import z from "zod";
import { AuthCoreZ, IAuthZ } from "../../schema/auth/auth.js";


export const AuthCreateZ = AuthCoreZ.omit({ status: true, tags: true });

export const AuthUpdateZ = AuthCreateZ.omit({ referBy: true, role: true }).partial()


export type IAuthClientZ = Omit<IAuthZ, 'status'>;
export type IAuthCreateZ = z.infer<typeof AuthCreateZ>;
export type IAuthUpdateZ = z.infer<typeof AuthUpdateZ>;
