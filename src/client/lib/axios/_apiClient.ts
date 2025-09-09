import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { IObj } from "../../../types/common.js";
import { APIResponse, APIResponseError, APIResponseSuccess } from "../../../server/lib/express/response/apiResponseTypes.js";



type HTTPMethods = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

type CommonMeta = { ReqStatus: number, ReqStatusText: string };


type HTTPImpl = <
    ResData = IObj,
    ErrData = IObj,
    ResMeta extends object = CommonMeta,
    ErrMeta extends object = CommonMeta
>(url: string, config?: AxiosRequestConfig) =>
    Promise<APIResponse<ResData, ErrData, ResMeta, ErrMeta>>



export type AxiosAPI = APIResponse<IObj, IObj, IObj & CommonMeta, IObj & CommonMeta>

export class APIClient {
    instance: AxiosInstance;

    constructor(instance?: AxiosInstance) {
        this.instance = instance || axios.create();
    }


    private handleAxiosError<U, ErrMeta extends object>(err: any): APIResponseError<U, ErrMeta & CommonMeta> {
        if (err instanceof AxiosError && err.response) {
            const axiosErr = err.response.data;

            return {
                ...axiosErr,
                meta: {
                    ...axiosErr.meta,
                    ReqStatus: err.status,
                    ReqStatusText: err.code
                }
            };
        }

        return {
            success: false,
            message: "Something went wrong",
            data: {} as U,
            meta: {
                ReqStatus: 0,
                ReqStatusText: 'Unknown error'
            } as unknown as ErrMeta & CommonMeta
        }
    }



    //  Overloads for strong typings
    createHandler(method: "get" | "delete" | "head" | "options"): <
        ResData = any,
        ErrData = IObj,
        ResMeta extends object = CommonMeta,
        ErrMeta extends object = CommonMeta
    >(
        url: string,
        config?: AxiosRequestConfig
    ) => Promise<APIResponse<ResData, ErrData, ResMeta & CommonMeta, ErrMeta & CommonMeta>>;

    createHandler(method: "post" | "put" | "patch"): <
        body = any,
        ResData = IObj,
        ErrData = IObj,
        ResMeta extends object = CommonMeta,
        ErrMeta extends object = CommonMeta
    >(
        url: string,
        data?: body,
        config?: AxiosRequestConfig
    ) => Promise<APIResponse<ResData, ErrData, ResMeta & CommonMeta, ErrMeta & CommonMeta>>;


    // implementation of above method
    createHandler(method: HTTPMethods) {

        const isDataMethod = ['post', 'put', 'patch'].includes(method);

        if (isDataMethod) {
            return async <body = any, ResData = IObj, ErrData = IObj, ResMeta extends object = IObj, ErrMeta extends object = IObj>(
                url: string,
                data?: body,
                config?: AxiosRequestConfig
            ): Promise<APIResponse<ResData, ErrData, ResMeta & CommonMeta, ErrMeta & CommonMeta>> => {

                try {
                    const res = await (this.instance as AxiosInstance)[method]<ResData>(url, data, config);
                    const result = res.data as APIResponseSuccess<ResData, ResMeta & CommonMeta>;
                    return {
                        ...result,
                        meta: {
                            ...result.meta,
                            ReqStatus: res.status,
                            ReqStatusText: res.statusText
                        }
                    };

                } catch (err) {
                    return this.handleAxiosError<ErrData, ErrMeta & CommonMeta>(err);
                }
            }
        }


        return async <ResData = IObj, ErrData = IObj, ResMeta extends object = IObj, ErrMeta extends object = IObj>(
            url: string,
            config?: AxiosRequestConfig
        ): Promise<APIResponse<ResData, ErrData, ResMeta, ErrMeta>> => {
            try {
                const res = await (this.instance as AxiosInstance)[method]<ResData>(url, config);
                const result = res.data as APIResponseSuccess<ResData, ResMeta & CommonMeta>;
                return {
                    ...result,
                    meta: {
                        ...result.meta,
                        ReqStatus: res.status,
                        ReqStatusText: res.statusText
                    }
                };

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


