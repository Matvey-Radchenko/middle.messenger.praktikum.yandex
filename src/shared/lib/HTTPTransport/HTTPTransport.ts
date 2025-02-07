import { RequestOptions, OptionsWithoutMethod } from './types';
import { METHODS } from './methods';
import { queryStringify } from '../utils/queryStringify';
import { isPlainObject } from '@shared/lib';

export class HTTPTransport {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private request(
        url: string,
        { method = 'GET', data = null, headers = {}, timeout = 5000 }: RequestOptions
    ): Promise<XMLHttpRequest> {
        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.withCredentials = true;

            Object.entries(headers).forEach(([key, value]) =>
                xhr.setRequestHeader(key, value)
            );

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr);
                } else {
                    reject(new Error(`HTTP Error: ${xhr.status} - ${xhr.statusText}`));
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

    private async requestWithRetries(
        url: string,
        options: RequestOptions
    ): Promise<XMLHttpRequest> {
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

    get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        const fullUrl =
            this.baseUrl + (options.data ? url + queryStringify(options.data) : url);
        return this.requestWithRetries(fullUrl, { ...options, method: METHODS.GET });
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(this.baseUrl + url, {
            ...options,
            method: METHODS.POST,
        });
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(this.baseUrl + url, {
            ...options,
            method: METHODS.PUT,
        });
    }

    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(this.baseUrl + url, {
            ...options,
            method: METHODS.PATCH,
        });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(this.baseUrl + url, {
            ...options,
            method: METHODS.DELETE,
        });
    }
}
