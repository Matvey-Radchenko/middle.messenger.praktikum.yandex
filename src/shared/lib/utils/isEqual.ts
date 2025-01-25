export function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        return a.every((el, index) => isEqual(el, b[index]));
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        return Object.keys(b).every((key) =>
            isEqual(
                (a as Record<string, unknown>)[key],
                (b as Record<string, unknown>)[key]
            )
        );
    }

    return false;
}
