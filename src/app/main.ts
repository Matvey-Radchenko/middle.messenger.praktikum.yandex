import { App } from './model/App';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    document.getElementsByTagName('body')[0].appendChild(app.element);
});
