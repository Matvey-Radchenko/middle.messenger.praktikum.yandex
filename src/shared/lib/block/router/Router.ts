import { BlockConstructor } from '../types/block';
import { Store } from '../store';
import { Route, RouteProps } from './Route';
import { StoreEvents } from '../store/types/StoreEvents';
import { EventBus } from '../eventBus';
import { RouterEvents } from './types/RouterEvents';

type RouterEventsMap = {
    [RouterEvents.PathChanged]: [{ path: string; param: string | null }];
};

export class Router {
    static __instance: Router | undefined;
    private _rootQuery!: string;
    private _unauthorizedPath!: string;
    private _pageNotFoundPath!: string;
    private _popstateHandler?: (event: PopStateEvent) => void;

    private _currentRoute: Route | null = null;
    private _isAuth: boolean = false;
    private eventBus!: EventBus<RouterEventsMap>;

    routes: Route[] = [];
    history: History = window.history;

    public static get instance(): Router {
        if (!Router.__instance) {
            throw new Error('Router. Экземпляр не создан');
        }

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
        this.eventBus = new EventBus<RouterEventsMap>();

        Router.__instance = this;

        Store.on(StoreEvents.Updated, () => {
            const isAuth = Store.getState<boolean>('isAuth');
            this._isAuth = Boolean(isAuth);
        });
    }

    get currentRoute() {
        if (!this._currentRoute) {
            throw new Error('Router. Текущий путь не найден');
        }
        const param = window.location.pathname.split('/').pop() || null;
        const { path, full } = this._currentRoute.pathname;

        return { path, param, full };
    }

    get currentPath() {
        return window.location.pathname;
    }

    private _getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }

    private _onRoute(pathname: string) {
        const route = this._getRoute(pathname);

        if (!route && this.currentPath === '/') {
            console.warn('Router. На корневом пути нет страницы');
            const fallbackRoute = this._isAuth
                ? this.routes.find((route) => route.requiredAuth) || this.routes[0]
                : this.routes[0];
            this.go(fallbackRoute.pathname.full);
            return;
        }

        if (!route) {
            console.warn('Router. Страница по данному пути не найдена:', pathname);
            this.go(this._pageNotFoundPath);
            return;
        }

        if (this._isAuth && route.prohibitedWhenLoggedIn) {
            console.warn('Router. Доступ запрещён для авторизованных пользователей');
            const targetRoute =
                this.routes.find((r) => r.requiredAuth) ||
                this.routes.find((r) => r.pathname.full === '/');
            if (targetRoute) {
                this.go(targetRoute.pathname.full);
                return;
            }
        }

        if (!this._isAuth && route.requiredAuth) {
            console.warn('Router. Пользователь не авторизован');
            this.go(this._unauthorizedPath);
            return;
        }

        this._currentRoute = route;
        route.render();
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

        this._popstateHandler = (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname);
        };

        window.addEventListener('popstate', this._popstateHandler);

        this._onRoute(window.location.pathname);
    }

    go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
        this.eventBus.emit(RouterEvents.PathChanged, this.currentRoute);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    onChange(callback: (value: RouterEventsMap[RouterEvents.PathChanged][0]) => void) {
        this.eventBus.on(RouterEvents.PathChanged, callback);
    }

    public static reset(): void {
        if (Router.__instance && Router.__instance._popstateHandler) {
            window.removeEventListener('popstate', Router.__instance._popstateHandler);
        }

        Router.__instance = undefined;
    }
}
