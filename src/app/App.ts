import { ChatPage } from '@pages/Chat/model/ChatPage';
import './styles/main.css';
import { UserData } from '@entities/index';
import { CreateAccountPage, NotFoundPage, LogInPage } from '@pages/index';
import { Page } from '@shared/index';

export class App {
    rootElement: HTMLElement;
    user?: UserData;

    get route() {
        return window.location.pathname;
    }

    constructor() {
        this.rootElement = document.getElementById('app')!;
        this.attachListeners();

        /* if (!this.user && this.route !== '/login') {
            console.log('atuoredirect to login');
            history.pushState(null, '', '/login');
        } */
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
                '/create-account': () => new CreateAccountPage(),
                '/login': () => new LogInPage(),
                '/chat': () => new ChatPage(),
            } as Record<string, () => Page>
        )[this.route]?.();

        if (page) {
            this.rootElement.innerHTML = page.render();
            page.attachListeners();
        } else {
            this.rootElement.innerHTML = NotFoundPage();
        }
    }
}
