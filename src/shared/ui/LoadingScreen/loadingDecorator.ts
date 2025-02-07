/* eslint-disable @typescript-eslint/no-explicit-any */
// Таковы требования к типизации декоратора метода
import { Store } from '@shared/lib';
import { LoadingScreenProps } from '@shared/ui';

export function loadingDecorator(caption: string): MethodDecorator {
    return function (
        _target: any,
        _propertyName: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            Store.set('spinner', {
                visible: true,
                caption: caption || '',
            } as LoadingScreenProps);

            try {
                const result = await originalMethod.apply(this, args);
                return result;
            } finally {
                Store.set('spinner', {
                    visible: false,
                    caption: '',
                } as LoadingScreenProps);
            }
        };
    };
}
