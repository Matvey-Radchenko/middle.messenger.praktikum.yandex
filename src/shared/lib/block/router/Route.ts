import { isEqual } from '@shared/lib';
import { Block, BlockConstructor } from '@shared/lib/block';

export type RouteProps = {
    pathname: string;
    view: BlockConstructor;
    props: { rootQuery: string; requiredAuth?: boolean };
};

export class Route {
    private _pathname: RouteProps['pathname'];
    private _blockClass: RouteProps['view'];
    private _props: RouteProps['props'];
    private _block: null | Block;

    constructor({ pathname, view, props }: RouteProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = {
            rootQuery: props.rootQuery,
            requiredAuth: props.requiredAuth ?? false,
        };
    }

    public get requiredAuth() {
        return this._props.requiredAuth;
    }

    public get pathname() {
        return this._pathname;
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
        }

        const root = document.querySelector(this._props.rootQuery);

        if (!root) {
            return;
        }

        if (!root.firstChild) {
            root.appendChild(this._block.element);
        } else {
            root.firstChild?.replaceWith(this._block.element);
        }
    }
}
