import { isArrayOrObject } from './isArrayOrObject';
import { isPlainObject } from './isPlainObject';
import { PlainObject } from './types/PlainObject';

function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

export function queryStringify(data: PlainObject | object) {
    if (!isPlainObject(data)) {
        throw new Error('input must be an object');
    }

    const params = getParams(data);
    const start = params.length ? '?' : '';

    return start + params.map((arr) => arr.join('=')).join('&');
}
