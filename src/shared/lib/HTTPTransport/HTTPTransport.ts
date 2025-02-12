import { RequestOptions, OptionsWithoutMethod, HTTPResponse } from './types';
import { METHODS } from './methods';
import { queryStringify } from '../utils/queryStringify';
import { isPlainObject } from '@shared/lib';

export class HTTPTransport {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private request<T = unknown>(
        url: string,
        { method = 'GET', data = null, headers = {}, timeout = 15000 }: RequestOptions
    ) {
        headers.accept = headers.accept || 'application/json';

        return new Promise<HTTPResponse<T>>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;

            Object.entries(headers).forEach(([key, value]) =>
                xhr.setRequestHeader(key, value)
            );

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response =
                        xhr.response !== 'OK' && headers['accept'] === 'application/json'
                            ? JSON.parse(xhr.response)
                            : xhr.response;

                    resolve({ value: response, status: xhr.status, ok: true });
                } else {
                    reject({
                        error: JSON.parse(xhr.response).reason,
                        status: xhr.status,
                        ok: false,
                    });
                }
            };

            xhr.onerror = () => reject(new Error('Network error'));
            xhr.ontimeout = () => reject(new Error('Request timed out'));
            xhr.timeout = timeout;

            const isGet = method === METHODS.GET || !data;

            if (isGet) {
                xhr.send();
            } else if (isPlainObject(data)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(data));
            } else if (
                typeof data === 'string' ||
                data instanceof Blob ||
                data instanceof ArrayBuffer ||
                data instanceof FormData
            ) {
                xhr.send(data);
            } else {
                throw new Error('Invalid data type');
            }
        });
    }

    private async requestWithRetries<T>(
        url: string,
        options: RequestOptions
    ): Promise<HTTPResponse<T>> {
        const { tries = 1 } = options;

        for (let i = 0; i < tries; i++) {
            try {
                return await this.request(url, options);
            } catch (error) {
                if (i === tries - 1) throw error;
            }
        }

        throw new Error('Request failed after maximum retries');
    }

    get<T>(url: string, options: OptionsWithoutMethod = {}): Promise<HTTPResponse<T>> {
        const fullUrl =
            this.baseUrl + (options.data ? url + queryStringify(options.data) : url);
        return this.requestWithRetries<T>(fullUrl, { ...options, method: METHODS.GET });
    }

    post<T>(url: string, options: OptionsWithoutMethod = {}): Promise<HTTPResponse<T>> {
        return this.requestWithRetries<T>(this.baseUrl + url, {
            ...options,
            method: METHODS.POST,
        });
    }

    put<T>(url: string, options: OptionsWithoutMethod = {}): Promise<HTTPResponse<T>> {
        return this.requestWithRetries<T>(this.baseUrl + url, {
            ...options,
            method: METHODS.PUT,
        });
    }

    patch<T>(url: string, options: OptionsWithoutMethod = {}): Promise<HTTPResponse<T>> {
        return this.requestWithRetries<T>(this.baseUrl + url, {
            ...options,
            method: METHODS.PATCH,
        });
    }

    delete<T>(url: string, options: OptionsWithoutMethod = {}): Promise<HTTPResponse<T>> {
        return this.requestWithRetries<T>(this.baseUrl + url, {
            ...options,
            method: METHODS.DELETE,
        });
    }
}
