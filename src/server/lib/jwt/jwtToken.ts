import jwt, { type SignOptions, type JwtPayload, VerifyOptions } from "jsonwebtoken";
import { IObj } from "../../../types/common.js";


type JWTExtracted<T> = JwtPayload & { data: T };
const { JWT_SECRET } = process.env;


export interface IToken {
    data: IObj,
    expiresInSeconds?: number
    secret?: string
    options?: Omit<SignOptions, 'expiresIn'>
}

export function generateToken({ data, expiresInSeconds = 60 * 60 * 24 * 7, secret = JWT_SECRET, options }: IToken): string | undefined {


    if (!secret) return;


    if (typeof data === "object") {
        return jwt.sign({ data }, secret, { expiresIn: expiresInSeconds, ...options });
    }
    return;
}



export interface IExtractToken {
    token: string
    secret?: string
    options?: VerifyOptions
}

export function extractToken<T = JwtPayload>({ token, secret = JWT_SECRET, options }: IExtractToken): JWTExtracted<T> | undefined {

    try {

        if (!token || !secret) return;

        // verify token
        const decoded = jwt.verify(token, secret, options) as any;


        if (typeof decoded === "object" && decoded.data) {
            return decoded as JWTExtracted<T>;
        } else {
            return;
        }

    } catch (error) {
        return;
    }

}
