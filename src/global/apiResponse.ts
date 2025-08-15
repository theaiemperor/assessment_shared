import { RequestHandler } from "express";
import { ZodType } from "zod/v4";
import { zodSchemaValidator } from "../lib/zod/zodValidator.js";
import { IObj } from "../types/common.js";
import { ResponseType, TypedRequestHandler } from "./apiResponseTypes.js";



// Core wrapper
function wrapResponse<Res, Err, ResMeta extends object, ErrMeta extends object>(
    handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>,
    schema?: ZodType
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

        // If schema exists, validate first
        if (schema) {
            return zodSchemaValidator(schema)(req, res, (err?: any) => {
                if (err) return next(err);
                handler(req, res as ResponseType<Res, Err, ResMeta, ErrMeta>, next);
            });
        }

        // No schema → directly call handler
        return handler(req, res as ResponseType<Res, Err, ResMeta, ErrMeta>, next);


    };
}

// Template factory
export function createResponseTemplate<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj
>(schema?: ZodType) {
    return (handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>): RequestHandler =>
        wrapResponse(handler, schema);
}

// Direct one-off
export function createResponse<
    Res = IObj,
    Err = IObj,
    ResMeta extends object = IObj,
    ErrMeta extends object = IObj
>(
    handler: TypedRequestHandler<Res, Err, ResMeta, ErrMeta>,
    schema?: ZodType
): RequestHandler {
    return wrapResponse(handler, schema);
}
