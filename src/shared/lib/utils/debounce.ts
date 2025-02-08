// Декоратор debounce, который принимает задержку (в миллисекундах)
export function debounce(delay: number = 300) {
    return function (
        _target: unknown,
        _propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;
        let timeoutId: ReturnType<typeof setTimeout>;
        descriptor.value = function (...args: unknown[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                originalMethod.apply(this, args);
            }, delay);
        };
        return descriptor;
    };
}
