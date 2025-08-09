import { Request, Response, RequestHandler } from 'express';
import { IObj } from '../types/common.js';

export interface APIResponse<T = IObj, U = IObj> {
    success: boolean,
    message: string,
    data: T,
    meta: U
}


// function to create custom response
type ResponseType<T, U> = Response<APIResponse<T, U>>;
type TypedRequestHandler<T, U> = (
    req: Request,
    res: ResponseType<T, U>,
    next: Function
) => void | ResponseType<T, U> | Promise<void | ResponseType<T, U>>;

export function createResponse<T = IObj, U = IObj>(handler: TypedRequestHandler<T, U>): RequestHandler {
    return handler;
};

