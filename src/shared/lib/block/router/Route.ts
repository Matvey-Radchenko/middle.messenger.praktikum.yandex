import { Block, BlockConstructor } from '@shared/lib/block';

export type RouteProps = {
    pathname: string;
    view: BlockConstructor;
    props: {
        rootQuery: string;
        requiredAuth?: boolean;
        prohibitedWhenLoggedIn?: boolean;
    };
};

export class Route {
    private _path: {
        path: RouteProps['pathname'];
        param: string | null;
        full: string;
    };
    private _blockClass: RouteProps['view'];
    private _props: RouteProps['props'];
    private _block: null | Block;

    constructor({ pathname, view, props }: RouteProps) {
        const [_, path, param] = pathname.split('/');
        this._path = { path, param, full: pathname };
        this._blockClass = view;
        this._block = null;
        this._props = {
            rootQuery: props.rootQuery,
            requiredAuth: props.requiredAuth ?? false,
            prohibitedWhenLoggedIn: props.prohibitedWhenLoggedIn ?? false,
        };
    }

    public get requiredAuth() {
        return this._props.requiredAuth;
    }

    public get prohibitedWhenLoggedIn() {
        return this._props.prohibitedWhenLoggedIn;
    }

    public get pathname() {
        return this._path;
    }

    match(pathname: string) {
        const [_, main = '/'] = pathname.split('/');
        return main === this._path.path;
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
            root.firstChild.replaceWith(this._block.element);
        }
    }
}
