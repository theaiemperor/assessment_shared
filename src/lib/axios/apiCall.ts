import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { APIResponse, APIResponseError, APIResponseSuccess } from "../../global/apiResponse.js";
import { IObj } from "../../types/common.js";



type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

type ComonMeta = { status: number, statusText: string };


type HTTPImpl = <
    ResData = IObj,
    ErrData = string,
    ResMeta extends object = ComonMeta,
    ErrMeta extends object = ComonMeta
>(url: string, config?: AxiosRequestConfig) =>
    Promise<APIResponse<ResData, ErrData, ResMeta, ErrMeta>>



export class APICall {
    private instance: AxiosInstance;

    constructor(instance?: AxiosInstance) {
        this.instance = instance || axios.create();
    }


    private handleAxiosError<U, ErrMeta extends object>(err: any): APIResponseError<U, ErrMeta & ComonMeta> {
        if (err instanceof AxiosError && err.response) {
            const axiosErr = err.response.data;

            return {
                ...axiosErr,
                meta: {
                    ...axiosErr.meta,
                    status: err.status,
                    statusText: err.code
                }
            };
        }

        return {
            success: false,
            message: "Something went wrong",
            data: {} as U,
            meta: {
                status: 0,
                statusText: 'Unknown error'
            } as ErrMeta & ComonMeta
        }
    }



    //  Overloads for strong typings
    private createHandler(method: "get" | "delete" | "head" | "options"): <
        ResData = IObj,
        ErrData = string,
        ResMeta extends object = ComonMeta,
        ErrMeta extends object = ComonMeta
    >(
        url: string,
        config?: AxiosRequestConfig
    ) => Promise<APIResponse<ResData, ErrData, ResMeta & ComonMeta, ErrMeta & ComonMeta>>;

    private createHandler(method: "post" | "put" | "patch"): <
        ResData = IObj,
        ErrData = string,
        ResMeta extends object = ComonMeta,
        ErrMeta extends object = ComonMeta
    >(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ) => Promise<APIResponse<ResData, ErrData, ResMeta & ComonMeta, ErrMeta & ComonMeta>>;


    // implementation of above method
    private createHandler(method: HTTPMethods) {

        const isDataMethod = ['post', 'put', 'patch'].includes(method);

        if (isDataMethod) {
            return async <ResData = IObj, ErrData = string, ResMeta extends object = IObj, ErrMeta extends object = IObj>(
                url: string,
                data?: any,
                config?: AxiosRequestConfig
            ): Promise<APIResponse<ResData, ErrData, ResMeta & ComonMeta, ErrMeta & ComonMeta>> => {

                try {
                    const res = await (this.instance as AxiosInstance)[method]<ResData>(url, data, config);
                    return res.data as APIResponseSuccess<ResData, ResMeta & ComonMeta>;

                } catch (err) {
                    return this.handleAxiosError<ErrData, ErrMeta & ComonMeta>(err);
                }
            }
        }


        return async <ResData = IObj, ErrData = string, ResMeta extends object = IObj, ErrMeta extends object = IObj>(
            url: string,
            config?: AxiosRequestConfig
        ): Promise<APIResponse<ResData, ErrData, ResMeta, ErrMeta>> => {
            try {
                const res = await (this.instance as AxiosInstance)[method]<ResData>(url, config);
                return res.data as APIResponseSuccess<ResData, ResMeta>;

            } catch (err) {
                return this.handleAxiosError<ErrData, ErrMeta>(err);
            }
        }
    }


    call<Allowed extends HTTPMethods[]>(allowed?: Allowed): Allowed extends undefined
        ? Record<HTTPMethods, HTTPImpl>
        : Pick<Record<HTTPMethods, HTTPImpl>, Allowed[number]> {

        const handlers = {
            get: this.createHandler('get'),
            post: this.createHandler('post'),
            put: this.createHandler('put'),
            patch: this.createHandler('patch'),
            delete: this.createHandler('delete'),
            options: this.createHandler('options'),
            head: this.createHandler('head'),
        };

        if (!allowed) {
            return handlers as any;
        }


        const filtered = Object.fromEntries(
            Object.entries(handlers).filter(([method]) =>
                allowed.includes(method as HTTPMethods)
            )
        );

        return filtered as any;
    }
}
