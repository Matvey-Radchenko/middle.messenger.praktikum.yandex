export function omit<T extends object, K extends keyof T>(
    obj: T,
    keys: readonly K[]
): Omit<T, K> {
    return (Object.keys(obj) as Array<keyof T>).reduce(
        (acc, key) => {
            if (!keys.includes(key as K)) {
                return { ...acc, [key]: obj[key] };
            }
            return acc;
        },
        {} as Omit<T, K>
    );
}
