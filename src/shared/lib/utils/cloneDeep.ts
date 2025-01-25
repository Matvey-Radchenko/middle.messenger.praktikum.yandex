export function cloneDeep<T>(value: T): T {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (value instanceof Date) {
        return new Date(value.getTime()) as T;
    }

    if (Array.isArray(value)) {
        return value.map((item) => cloneDeep(item)) as T;
    }

    const result: Record<string, unknown> = {};

    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            result[key] = cloneDeep((value as unknown as T)[key]);
        }
    }
    return result as T;
}
