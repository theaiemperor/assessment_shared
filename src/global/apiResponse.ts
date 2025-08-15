import { Request, RequestHandler } from "express";
import { ZodType } from "zod/v4";
import { zodSchemaValidator } from "../lib/zod/zodValidator.js";
import { IObj } from "../types/common.js";
import { SchemaType, TypedRequestHandler } from "./apiResponseTypes.js";

function wrapResponse<Res, Err, ResMeta extends object, ErrMeta extends object, Schema extends ZodType | undefined>(
    handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta, Schema extends ZodType ? SchemaType<Schema> : Request>,
    schema?: Schema): RequestHandler {

    return (req, res, next) => {
        const originalJson = res.json.bind(res);

        res.json = (body: any) => {
            const defaultResponse = {
                message: "",
                meta: {},
                success: true,
            };
            return originalJson({ ...defaultResponse, ...body });
        };

        if (schema) {
            return zodSchemaValidator(schema)(req, res, (err?: any) => {
                if (err) return next(err);
                handler(req as any, res as any, next);
            });
        }

        return handler(req as any, res as any, next);
    };
}


export function createResponseTemplate<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj,
    Schema extends ZodType | undefined = undefined

>(schema?: Schema) {
    return (handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta, Schema extends ZodType ? SchemaType<Schema> : Request>): RequestHandler =>
        wrapResponse(handler, schema);
}



export function createResponse<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj,
    Schema extends ZodType | undefined = undefined
>(
    handler: TypedRequestHandler<
        Res,
        Err,
        ResMeta,
        ErrMeta,
        Schema extends ZodType ? SchemaType<Schema> : Request
    >,
    schema?: Schema
): RequestHandler {
    return wrapResponse(handler, schema);
}
