import { CreateAccountPage, LogInPage, ChatPage, ProfilePage } from '@pages';
import { Block, BlockConstructor, Router, Store } from '@shared/lib';
import {
    InternalServerErrorPage,
    NotFoundErrorPage,
    UnauthorizedErrorPage,
} from '@pages/ErrorScreens';
import { AuthController } from '@entities/User';
import { LoadingScreen } from '@shared/ui';
import { Toast, ToastProps } from '@shared/ui';
import { isHTTPResponse } from '@shared/lib/HTTPTransport/types';

export class App extends Block {
    router = new Router({
        rootQuery: '#app',
        unauthorizedPath: '/401',
        pageNotFoundPath: '/404',
    });

    constructor() {
        super({
            LoadingScreen: new LoadingScreen(),
            Toast: new Toast(),
        });

        AuthController.getUser().finally(() => {
            this.router
                .use('/', LogInPage, { prohibitedWhenLoggedIn: true })
                .use('/sign-up', CreateAccountPage, {
                    prohibitedWhenLoggedIn: true,
                })
                .use('/messenger/:id', ChatPage, { requiredAuth: true })
                .use('/settings', ProfilePage as BlockConstructor, { requiredAuth: true })
                .use('/500', InternalServerErrorPage)
                .use('/401', UnauthorizedErrorPage)
                .use('/404', NotFoundErrorPage)
                .start();
        });

        this.attachEvents();
    }

    attachEvents() {
        window.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'A') {
                event.preventDefault();
            }
        });

        window.addEventListener('submit', (event) => {
            const target = event.target as HTMLFormElement;
            if (target.tagName === 'FORM') {
                event.preventDefault();
            }
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.warn('UnhandledRejection', event);

            if (isHTTPResponse(event.reason)) {
                const response = event.reason;

                if (response.ok) {
                    return;
                }

                Store.set('toast', {
                    visible: true,
                    message: `Ошибка: ${response.status} - ${response.error}`,
                    type: 'error',
                } as ToastProps);
            }
        });
    }

    render() {
        return `
            <div id="app">
                {{{ LoadingScreen }}}
                {{{ Toast }}}
            </div>
        `;
    }
}
