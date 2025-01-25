import { isEqual } from '@shared/lib';
import { Block } from '@shared/lib/block';

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    root?.firstChild?.replaceWith(block.element);
    return root;
}

type RouteProps = {
    pathname: string;
    view: new (...args: unknown[]) => Block;
    props: { rootQuery: string };
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
        this._props = props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this.render();
            this._pathname = pathname;
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass();
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

// const route = new Route('/buttons', Button, {
//     rootQuery: '.app',
// });
