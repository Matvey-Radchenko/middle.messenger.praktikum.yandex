import { ErrorScreen } from '@pages/ErrorScreens/ui';
import { Link } from '@shared/ui';

export class InternalServerErrorPage extends ErrorScreen {
    constructor() {
        super({
            code: 500,
            message: 'Ошибка на стороне сервера. Бежим чинить',
            link: new Link({ text: 'Назад к чатам', href: '/chat' }),
        });
    }
}
