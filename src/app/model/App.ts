import './customHistory';
import './partials';
import { CreateAccountPage, LogInPage, ChatPage, ErrorScreen, ProfilePage } from '@pages';
import { User } from '@entities';
import { Block } from '@shared/lib';
import { Link } from '@shared/ui';

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
        // this.render();
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
        const page = (
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
                '/500': () =>
                    new ErrorScreen({
                        code: 500,
                        message: 'Куда я жмал?',
                        link: new Link({ text: 'Назад к чатам', href: '/chat' }),
                    }),
                '/404': () =>
                    new ErrorScreen({
                        code: 404,
                        message: 'Ты куда звóнишь, сынок?',
                        link: new Link({ text: 'Назад к чатам', href: '/chat' }),
                    }),
            } as Record<string, () => Block>
        )[this.route]?.();

        if (!page) {
            history.replaceState(null, '', '/404');
            return;
        }

        if (this.rootElement.firstElementChild) {
            this.rootElement.firstElementChild.replaceWith(page.element);
        } else {
            this.rootElement.appendChild(page.element);
        }

        page.dispatchComponentDidMount();
    }
}
