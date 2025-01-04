import { Listener } from './types/eventBus';

export class EventBus {
    private listeners: Record<string, Listener[]> = {};

    on<T = unknown>(event: string, callback: Listener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    off<T = unknown>(event: string, callback: Listener<T>): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    emit<T = unknown>(event: string, ...args: T[]): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => listener(...args));
    }
}
