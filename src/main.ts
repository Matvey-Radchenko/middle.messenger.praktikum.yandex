import './partials';
import { App } from './app/App';
import './app/router';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();

    app.render();
});
