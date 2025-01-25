import { set } from '@shared/lib';

export class Store {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);
    }
}
