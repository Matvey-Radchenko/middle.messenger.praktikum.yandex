import { CreateAccountPage, LogInPage, ChatPage, ProfilePage } from '@pages';
import { Block, Router, Store } from '@shared/lib';
import {
    InternalServerErrorPage,
    NotFoundErrorPage,
    UnauthorizedErrorPage,
} from '@pages/ErrorScreens';
import { AuthController } from '@entities/User';
import { LoadingScreen } from '@shared/ui';
import { Toast, ToastProps } from '@shared/ui';

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
                .use('/login', LogInPage)
                .use('/create-account', CreateAccountPage)
                .use('/profile', ProfilePage, { requiredAuth: true })
                .use('/chat', ChatPage, { requiredAuth: true })
                .use('/500', InternalServerErrorPage, { requiredAuth: true })
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

            Store.set('toast', {
                visible: true,
                message: event.reason,
                type: 'error',
            } as ToastProps);
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
