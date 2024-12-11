export interface Page {
    render(): string;
    attachListeners(): void;
}
