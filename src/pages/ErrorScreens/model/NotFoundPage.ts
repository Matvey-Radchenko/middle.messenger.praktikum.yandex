import { Page } from '@shared';
import { ErrorScreenTemplate } from '../ui';

export class NotFoundPage implements Page {
    render() {
        return ErrorScreenTemplate({
            code: 404,
            message: 'Ты куда звóнишь, сынок?',
            link: { text: 'Назад к чатам', href: '/chat' },
        });
    }
}
