import { ErrorScreen } from '@pages/ErrorScreens/ui';
import { Link } from '@shared/ui';

export class NotFoundErrorPage extends ErrorScreen {
    constructor() {
        super({
            code: 404,
            message: 'Ты куда звóнишь, сынок?',
            link: new Link({ text: 'Назад к чатам', href: '/chat' }),
        });
    }
}
