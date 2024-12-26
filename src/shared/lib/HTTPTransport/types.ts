type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type RequestOptions = {
    method?: HttpMethod;
    data?: Record<string, any> | null;
    headers?: Record<string, string>;
    timeout?: number;
    tries?: number;
};

export type OptionsWithoutMethod = Omit<RequestOptions, 'method'>;
