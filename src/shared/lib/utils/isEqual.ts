export function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        // Сравниваем длину массивов и затем элементы
        if (a.length !== b.length) {
            return false;
        }
        return a.every((el, index) => isEqual(el, b[index]));
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        return aKeys.every((key) =>
            isEqual(
                (a as Record<string, unknown>)[key],
                (b as Record<string, unknown>)[key]
            )
        );
    }

    return false;
}
