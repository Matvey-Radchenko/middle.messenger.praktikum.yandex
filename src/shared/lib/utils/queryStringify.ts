export function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Input must be a non-null object');
    }

    const encode = (value: unknown): string => {
        if (value === null || value === undefined) {
            return '';
        }
        if (Array.isArray(value)) {
            return value.map((item) => encodeURIComponent(String(item))).join(',');
        }
        if (typeof value === 'object') {
            return '[object Object]';
        }
        return encodeURIComponent(String(value));
    };

    const entries = Object.entries(data)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encode(value)}`)
        .filter((pair) => !pair.endsWith('='));

    return entries.length > 0 ? `?${entries.join('&')}` : '';
}
