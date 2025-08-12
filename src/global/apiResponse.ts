import { Request, Response, RequestHandler } from "express";
import { IObj } from "../types/common.js";

// API response type with separate success/error payloads
export type APIResponse<Res = IObj, Err = IObj> =
    | {
        success: true;
        message: string;
        data: Res;
        meta: IObj;
    }
    | {
        success: false;
        message: string;
        data: Err;
        meta: IObj;
    };



// Utility type for handler response
type ResponseType<Res, Err> = Response<
    | (Partial<APIResponse<Res, Err>> & { data: Res; success?: true })
    | (Partial<APIResponse<Res, Err>> & { data: Err; success: false })
>;


// Typed handler
type TypedRequestHandler<Res, Err> = (
    req: Request,
    res: ResponseType<Res, Err>,
    next: Function
) => void | Promise<void>;



// Core wrapper
function wrapResponse<Res, Err>(
    handler: TypedRequestHandler<Res, Err>
): RequestHandler {
    return (req, res, next) => {
        const originalJson = res.json.bind(res);

        res.json = (body: any) => {
            const defaultResponse = {
                message: "",
                meta: {},
                success: true
            };
            return originalJson({ ...defaultResponse, ...body });
        };

        return handler(req, res as ResponseType<Res, Err>, next);
    };
}

// Template factory
export function createResponseTemplate<Res = IObj, Err = IObj>() {
    return (handler: TypedRequestHandler<Res, Err>): RequestHandler =>
        wrapResponse(handler);
}

// Direct one-off
export function createResponse<Res = IObj, Err = string>(
    handler: TypedRequestHandler<Res, Err>
): RequestHandler {
    return wrapResponse(handler);
}
