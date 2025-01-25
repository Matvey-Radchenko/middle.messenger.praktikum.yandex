import { isPlainObject } from './isPlainObject';

export function set(target: Indexed, path: string, value: unknown): Indexed {
    if (!isPlainObject(target)) {
        return target;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    let currentObject: Indexed = target as Indexed;

    path.split('.').forEach((key, index, keys) => {
        console.log(key);

        if (index != keys.length - 1) {
            const newObject = { [key]: {} };
            Object.assign(currentObject, newObject);
            console.log(currentObject);
            currentObject = newObject[key];
        } else {
            currentObject[key] = value;
        }
    });

    return target;
}
