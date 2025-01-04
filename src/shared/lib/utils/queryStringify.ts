export function queryStringify(data: Record<string, unknown>): string {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    let queryString = '';

    Object.entries(data).forEach(([key, value], index, array) => {
        queryString += `${key}=${value?.toString()}`;

        if (index !== array.length - 1) {
            queryString += '&';
        }
    });

    return queryString ? '?' + queryString : '';
}
