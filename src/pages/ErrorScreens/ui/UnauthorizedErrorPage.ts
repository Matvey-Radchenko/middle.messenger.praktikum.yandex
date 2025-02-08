import { ErrorScreen } from '@pages/ErrorScreens/ui';
import { Link } from '@shared/ui';

export class UnauthorizedErrorPage extends ErrorScreen {
    constructor() {
        super({
            code: 401,
            message: 'Вы недостаточно авторизованы',
            link: new Link({ text: 'Войти', href: '/login' }),
        });
    }
}
