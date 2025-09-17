import Axios, { AxiosError, AxiosInstance } from 'axios';
import { IHttpRequestPort, THttpRequestParams } from './http-request.port';

const API_BASE_URL = process.env.IA_BACKEND_URL;

class AxiosHttpRequest implements IHttpRequestPort {
    axiosInstance: AxiosInstance | null = null;

    async get({ path, params }: THttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({
            path,
            params,
        });
        const response = await axiosInstance.get(url);
        return response.data;
    }

    async post({ path, params, body }: THttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({
            path,
            params,
        });

        const config = {};

        if (body instanceof FormData) {
            (config as any).headers = {
                'Content-Type': 'multipart/form-data',
            };
        }

        const response = await axiosInstance.post(url, body, config);
        return response.data;
    }

    async delete({ path, params }: THttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({
            path,
            params,
        });
        const response = await axiosInstance.delete(url);
        return response.data;
    }

    async put({ path, body }: THttpRequestParams): Promise<unknown | null> {
        const { axiosInstance, url } = this._buildRequestConfig({ path });
        const response = await axiosInstance.put(url, body);
        return response.data;
    }

    setBaseUrl(baseUrl: string): void {
        this._getInstance();
        if (!this.axiosInstance)
            throw Error(
                'Erro ao trocar a baseUrl do cliente HTTP, instância ainda não existe',
            );
        this.axiosInstance.defaults.baseURL = baseUrl;
    }

    _createClient(): AxiosInstance {
        const client = Axios.create({
            baseURL: API_BASE_URL,
        });

        client.interceptors.request.use(
            async (config) => {
                (config as any).metadata = { startTime: new Date() };
                console.log(
                    `➡️ [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`,
                );
                return config;
            },
            (error) => Promise.reject(error),
        );

        client.interceptors.response.use(
            (response) => {
                const duration =
                    new Date().getTime() -
                    ((response.config as any).metadata?.startTime?.getTime() ?? 0);

                console.log(
                    `✅ [${response.status}] ${response.config.url} (${duration}ms)`,
                );

                return response;
            },
            (error: AxiosError) => {
                const duration =
                    new Date().getTime() -
                    ((error.config as any).metadata?.startTime?.getTime() ?? 0);

                console.error('❌ [Axios Error]', {
                    url: error.config?.url,
                    method: error.config?.method?.toUpperCase(),
                    status: error.response?.status,
                    duration: `${duration}ms`,
                    data: error.response?.data,
                });

                const status = error.response?.status;

                const message =
                    // @ts-ignore
                    error.response?.data?.message ||
                    error.message ||
                    'Erro de conexão com o servidor.';

                throw new Error(`[${status}] ${message}`);
            },
        );

        return client;
    }

    _getInstance(): AxiosInstance {
        if (!this.axiosInstance) {
            this.axiosInstance = this._createClient();
        }
        return this.axiosInstance;
    }

    _buildQueryString(params?: object) {
        if (!params) return null;

        const queryString = Object.keys(params)
            .map((key) => key + '=' + encodeURIComponent((params as any)[key]))
            .join('&');

        return `?${queryString}`;
    }

    _buildRequestConfig({ params, path }: THttpRequestParams) {
        const queryString = this._buildQueryString(params);
        const axiosInstance = this._getInstance();
        const url = `${path}${queryString ? queryString : ''}`;
        return { url, axiosInstance };
    }
}

const AxiosHttpRequestAdapter = new AxiosHttpRequest();

export default AxiosHttpRequestAdapter;
