import { Block, Store, StoreConnector } from '@shared/lib';
import './Toast.css';

export type ToastProps = {
    visible: boolean;
    message: string;
    type: 'error' | 'warning';
};

@StoreConnector((state) => state.toast as ToastProps)
export class Toast extends Block<ToastProps> {
    constructor() {
        super({
            visible: false,
            message: '',
            type: 'warning',
        });
    }

    override render(): string {
        return `
            <div class="toast {{#if visible}}visible{{else}}hidden{{/if}} {{type}}">
                {{message}}
            </div>
        `;
    }

    override componentDidUpdate(oldProps: ToastProps, newProps: ToastProps): boolean {
        // Если только что сделали toast видимым, через 3 секунды его скрываем
        if (newProps.visible && !oldProps.visible) {
            setTimeout(() => {
                Store.set('toast', { visible: false });
            }, 3000);
        }
        return true;
    }
}
