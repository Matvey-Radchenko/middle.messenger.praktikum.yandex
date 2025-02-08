type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
    method?: HttpMethod;
    data?: unknown;
    headers?: Record<string, string>;
    timeout?: number;
    tries?: number;
};

export type OptionsWithoutMethod = Omit<RequestOptions, 'method'>;
export type GetOptions = Omit<RequestOptions, 'method' | 'data'>;

export type HTTPResponse<T = unknown> =
    | {
          status: number;
          ok: true;
          value: T;
      }
    | {
          status: number;
          ok: false;
          error: string;
      };

export function isHTTPResponse<T = unknown>(
    payload: unknown
): payload is HTTPResponse<T> {
    if (typeof payload !== 'object' || payload === null) {
        return false;
    }
    const res = payload as HTTPResponse<T>;
    if (typeof res.status !== 'number' || typeof res.ok !== 'boolean') {
        return false;
    }
    if (res.ok === true) {
        // Если ok === true, то обязательно должно быть поле value.
        return 'value' in res;
    } else {
        // Если ok === false, то обязательно должно быть поле error типа string.
        return typeof res.error === 'string';
    }
}
