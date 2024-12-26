import { RequestOptions, OptionsWithoutMethod } from './types';
import { METHODS } from './methods';
import { queryStringify } from '../utils/queryStringify';

export class HTTPTransport {
    private request(
        url: string,
        { method = 'GET', data = null, headers = {}, timeout = 5000 }: RequestOptions
    ): Promise<XMLHttpRequest> {
        return new Promise<XMLHttpRequest>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

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

            method === METHODS.GET || !data
                ? xhr.send()
                : xhr.send(typeof data === 'object' ? JSON.stringify(data) : data);
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
        const fullUrl = options.data ? url + queryStringify(options.data) : url;
        return this.requestWithRetries(fullUrl, { ...options, method: METHODS.GET });
    }

    post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(url, { ...options, method: METHODS.POST });
    }

    put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(url, { ...options, method: METHODS.PUT });
    }

    patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(url, { ...options, method: METHODS.PATCH });
    }

    delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
        return this.requestWithRetries(url, { ...options, method: METHODS.DELETE });
    }
}
