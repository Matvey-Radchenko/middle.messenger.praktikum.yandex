import { BlockConstructor } from '@shared/lib/block';
import { Route } from './Route';

export class Router {
    static __instance: Router;
    routes: Route[] = [];
    history: History = window.history;
    private _currentRoute: Route | null = null;
    private _rootQuery!: string;

    public static get instance(): Router {
        return Router.__instance;
    }

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: BlockConstructor) {
        const route = new Route({
            pathname,
            view: block,
            props: { rootQuery: this._rootQuery },
        });
        this.routes.push(route);

        return this;
    }

    start() {
        window.addEventListener('popstate', (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname);
        });

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this._getRoute(pathname) || this.routes.at(-1);

        if (!route) {
            console.warn('Страница по данному пути не найдена');
            return;
        }

        this._currentRoute = route;

        route.render();
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    private _getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
