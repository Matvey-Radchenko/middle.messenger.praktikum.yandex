import { App } from './app/App';
import Handlebars from 'handlebars';
import { Input, Button } from '@shared/index';

Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
});
