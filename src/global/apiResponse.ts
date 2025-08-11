import { Request, Response, RequestHandler } from 'express';
import { IObj } from '../types/common.js';

// Base API response interface
export interface APIResponse<T = IObj> {
    success: boolean;
    message: string;
    data: T;
    meta: IObj;
}

// Utility type for handler response
type ResponseType<T> = Response<Partial<APIResponse<T>> & { data: T }>;

// Your typed handler type
type TypedRequestHandler<T> = (
    req: Request,
    res: ResponseType<T>,
    next: Function
) => void | Promise<void>;




// Factory to create handler with default response wrapper
export function createResponse<T = IObj>(
    handler: TypedRequestHandler<T>
): RequestHandler {


    return (req, res, next) => {
        const originalJson = res.json.bind(res);

        res.json = (body: Partial<APIResponse<T>>) => {
            const defaultResponse: Omit<APIResponse<T>, 'data'> = {
                success: true,
                message: '',
                meta: {},
            };
            return originalJson({ ...defaultResponse, ...body });
        };

        return handler(req, res as ResponseType<T>, next);
    };
}

