import { BlockConstructor, Store } from '@shared/lib/block';
import { Route, RouteProps } from './Route';
import { StoreEvents } from '../store/types/StoreEvents';

export class Router {
    static __instance: Router;
    private _rootQuery!: string;
    private _unauthorizedPath!: string;
    private _pageNotFoundPath!: string;

    private _currentRoute: Route | null = null;
    private _isAuth: boolean = false;

    routes: Route[] = [];
    history: History = window.history;

    public static get instance(): Router {
        return Router.__instance;
    }

    constructor({
        rootQuery,
        unauthorizedPath,
        pageNotFoundPath,
    }: {
        rootQuery: string;
        unauthorizedPath: string;
        pageNotFoundPath: string;
    }) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._rootQuery = rootQuery;
        this._unauthorizedPath = unauthorizedPath;
        this._pageNotFoundPath = pageNotFoundPath;

        Router.__instance = this;

        Store.on(StoreEvents.Updated, () => {
            const isAuth = Store.getState<boolean>('isAuth');
            this._isAuth = Boolean(isAuth);
        });
    }

    get currentPath() {
        return window.location.pathname;
    }

    use<T extends BlockConstructor>(
        pathname: string,
        block: T,
        props?: Omit<RouteProps['props'], 'rootQuery'>
    ) {
        const route = new Route({
            pathname,
            view: block,
            props: { rootQuery: this._rootQuery, ...props },
        });

        this.routes.push(route);

        return this;
    }

    start() {
        if (!this.routes.length) {
            throw new Error('Router. Отсутствуют маршруты');
        }

        window.addEventListener('popstate', (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname);
        });

        this._onRoute(this.currentPath);
    }

    _onRoute(pathname: string) {
        const route = this._getRoute(pathname);

        if (!route && this.currentPath === '/') {
            console.warn('Router. На корневом пути нет страницы');
            const route = this._isAuth
                ? this.routes.find((route) => route.requiredAuth) || this.routes[0]
                : this.routes[0];

            this.go(route.pathname);
            return;
        }

        if (!route) {
            console.warn('Router. Страница по данному пути не найдена:', pathname);
            this.go(this._pageNotFoundPath);
            return;
        }

        if (!this._isAuth && route.requiredAuth) {
            console.warn('Router. Пользователь не авторизован');
            this.go(this._unauthorizedPath);
            return;
        }

        this._currentRoute = route;

        route.render();
    }

    go(pathname: string) {
        if (!this._currentRoute?.match(pathname)) {
            this.history.pushState({}, '', pathname);
            this._onRoute(pathname);
        }
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
