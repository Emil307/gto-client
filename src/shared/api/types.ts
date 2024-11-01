import { AxiosInstance, AxiosInterceptorOptions } from "axios";

type TAxiosRequestInterceptors = Parameters<AxiosInstance["interceptors"]["request"]["use"]>;
export type TAxiosRequestInterceptorSuccess = TAxiosRequestInterceptors[0];
export type TAxiosRequestInterceptorError = TAxiosRequestInterceptors[1];

type TAxiosResponseInterceptors = Parameters<AxiosInstance["interceptors"]["response"]["use"]>;
export type TAxiosResponseInterceptorSuccess = TAxiosResponseInterceptors[0];
export type TAxiosResponseInterceptorError = TAxiosResponseInterceptors[1];

export type TAxiosInterceptorOptions = AxiosInterceptorOptions;

/**
 * Нельзя использовать с Response Interceptor @link https://github.com/axios/axios/issues/5074
 */
export type TAxiosRunWhen = Exclude<AxiosInterceptorOptions["runWhen"], undefined>;

export type TFileDownloadResponse = {
    data: Blob;
    filename: string;
};
