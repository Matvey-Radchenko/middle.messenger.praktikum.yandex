import { isPlainObject } from './isPlainObject';

export function merge(target: Indexed, payload: Indexed): Indexed {
    Object.entries(payload).forEach(([key, value]) => {
        const targetValue = target[key];

        if (!targetValue) {
            target[key] = value;
        } else if (isPlainObject(targetValue)) {
            target[key] = merge(targetValue as Indexed, value as Indexed);
        }
    });

    return target;
}
