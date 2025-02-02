import { CreateAccountPage, LogInPage, ChatPage, ProfilePage } from '@pages';
import { Router, Store } from '@shared/lib';
import { InternalServerErrorPage, NotFoundErrorPage } from '@pages/ErrorScreens';
import { MOCK_USER } from '@entities/User/api/mock/mockUser';

export class App {
    router = new Router('#app');

    constructor() {
        this.router
            .use('/login', LogInPage)
            .use('/create-account', CreateAccountPage)
            .use('/profile', ProfilePage)
            .use('/chat', ChatPage)
            .use('/500', InternalServerErrorPage)
            .use('/404', NotFoundErrorPage)
            .start();

        Store.set('user', MOCK_USER);
    }
}
