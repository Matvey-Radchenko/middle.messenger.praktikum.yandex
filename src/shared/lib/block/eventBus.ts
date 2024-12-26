import { Listener } from './types/eventBus';

export class EventBus {
    private listeners: Record<string, Listener[]> = {};

    on<T = any>(event: string, callback: Listener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off<T = any>(event: string, callback: Listener<T>): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit<T = any>(event: string, ...args: T[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => listener(...args));
    }
}
