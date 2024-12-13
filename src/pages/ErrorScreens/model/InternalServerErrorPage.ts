import { Page } from '@shared/index';
import { ErrorScreenTemplate } from '../ui';

export class InternalServerErrorPage implements Page {
    render(): string {
        return ErrorScreenTemplate({
            code: 500,
            message: 'Куда я жмал?',
            link: { text: 'Назад к чатам', href: '/chat' },
        });
    }
}
