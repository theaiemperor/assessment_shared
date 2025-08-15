import { Request, Response, RequestHandler } from "express";
import { IObj } from "../types/common.js";



export interface APIResponseSuccess<Res, Meta extends object> {
    success: true;
    message: string;
    data: Res;
    meta: Meta;
}


export interface APIResponseError<Err, Meta extends object> {
    success: false;
    message: string;
    data: Err;
    meta: Meta;
}




export type APIResponse<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj
> = APIResponseSuccess<Res, ResMeta> | APIResponseError<Err, ErrMeta>


// Utility type for handler response
type ResponseType<Res, Err, ResMeta extends object, ResErr extends object> = Response<
    | (Partial<APIResponse<Res, Err, ResMeta, ResErr>> & { data: Res; success?: true })
    | (Partial<APIResponse<Res, Err>> & { data: Err; success: false })
>;


// Typed handler
type TypedRequestHandler<Res, Err, ResMeta extends object, ErrMeta extends object> = (
    req: Request,
    res: ResponseType<Res, Err, ResMeta, ErrMeta>,
    next: Function
) => void | Promise<void>;



// Core wrapper
function wrapResponse<Res, Err, ResMeta extends object, ErrMeta extends object>(
    handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>
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

        return handler(req, res as ResponseType<Res, Err, ResMeta, ErrMeta>, next);
    };
}

// Template factory
export function createResponseTemplate<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj
>() {
    return (handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>): RequestHandler =>
        wrapResponse(handler);
}

// Direct one-off
export function createResponse<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj
>(
    handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>
): RequestHandler {
    return wrapResponse(handler);
}
