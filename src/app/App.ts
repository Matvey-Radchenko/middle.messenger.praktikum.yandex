import { CreateAccount } from '@pages/CreateAccount/model/CreateAccount';
import './styles/main.css';

export class App {
    rootElement: HTMLElement;

    constructor() {
        const appElement = document.getElementById('app')!;
        this.rootElement = appElement;
    }

    render() {
        const createAccountPage = new CreateAccount();
        this.rootElement.innerHTML = createAccountPage.render();
        createAccountPage.attachListeners();
    }
}
