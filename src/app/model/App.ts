import './customHistory';
import './partials';
import {
    CreateAccountPage,
    NotFoundPage,
    LogInPage,
    ProfilePage,
    ChatPage,
    InternalServerErrorPage,
} from '@pages';
import { User } from '@entities/User/model/User';
import { Page } from '@shared/types/PageType';

export class App {
    rootElement: HTMLElement;
    user?: User;

    get route() {
        return window.location.pathname;
    }

    constructor() {
        this.rootElement = document.getElementById('app')!;
        this.attachListeners();

        if (!this.user && ['/chat', '/profile'].includes(this.route)) {
            history.pushState(null, '', '/login');
            alert('Cначала необходимо войти в аккаунт');
            return;
        }

        if (this.route === '/') {
            history.pushState(null, '', '/login');
        }
    }

    logOut() {
        this.user = undefined;
        history.pushState(null, '', '/login');
    }

    setUser(user: User) {
        this.user = user;
        this.render();
    }

    handleAuth(data: User) {
        this.setUser(data);
        history.pushState(null, '', '/chat');
    }

    attachListeners() {
        window.addEventListener('historychange', () => this.render());

        document.addEventListener('click', (event) => {
            const link = (event.target as HTMLElement).closest('[data-link]');
            if (link) {
                event.preventDefault();
                history.pushState(null, '', link.getAttribute('href')!);
            }
        });
    }

    render() {
        let page = (
            {
                '/create-account': () =>
                    new CreateAccountPage({
                        onCreateAccount: this.handleAuth.bind(this),
                    }),
                '/login': () => new LogInPage({ onLogIn: this.handleAuth.bind(this) }),
                '/chat': () => new ChatPage(),
                '/profile': () =>
                    new ProfilePage(
                        this.user!,
                        this.setUser.bind(this),
                        this.logOut.bind(this)
                    ),
                '/500': () => new InternalServerErrorPage(),
                '/404': () => new NotFoundPage(),
            } as Record<string, () => Page>
        )[this.route]?.();

        if (page) {
            this.rootElement.innerHTML = page.render();
            page.attachListeners?.();
        } else {
            this.rootElement.innerHTML = new NotFoundPage().render();
        }
    }
}
