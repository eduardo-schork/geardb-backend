import { AxiosRequestHeaders } from 'axios';

import AxiosHttpRequestAdapter from './axios-http-request.adapter';

export type RequestHeaders = AxiosRequestHeaders;

export type THttpRequestParams = {
    path: string;
    body?: object;
    params?: object;
};

export interface IHttpRequestPort {
    get(config: THttpRequestParams): Promise<unknown | null>;
    post(config: THttpRequestParams): Promise<unknown | null>;
    delete(config: THttpRequestParams): Promise<unknown | null>;
    put(config: THttpRequestParams): Promise<unknown | null>;
    setBaseUrl(baseUrl: string): void;
}

const HttpRequestPort = AxiosHttpRequestAdapter;

export default HttpRequestPort;
