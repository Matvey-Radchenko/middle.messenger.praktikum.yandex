import { Listener } from './types/eventBus';

export class EventBus<TEvents extends Record<string, any[]>> {
    private listeners: {
        [K in keyof TEvents]?: Listener<TEvents[K]>[];
    } = {};

    on<K extends keyof TEvents>(event: K, callback: Listener<TEvents[K]>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event]!.push(callback);
    }

    off<K extends keyof TEvents>(event: K, callback: Listener<TEvents[K]>): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${String(event)}`);
        }
        this.listeners[event] = this.listeners[event]!.filter(
            (listener) => listener !== callback
        );
    }

    emit<K extends keyof TEvents>(event: K, ...args: TEvents[K]): void {
        const listeners = this.listeners[event];

        if (!listeners) {
            console.warn(`Осутствуют обработчики события: ${String(event)}`);
            return;
        }

        listeners.forEach((listener) => listener(...args));
    }
}
