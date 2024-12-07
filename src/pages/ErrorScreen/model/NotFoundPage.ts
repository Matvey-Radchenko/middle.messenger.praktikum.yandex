import { ErrorScreenTemplate } from '../ui';

export const NotFoundPage = () =>
    ErrorScreenTemplate({
        code: 404,
        message: 'Ты куда звóнишь, сынок?',
        link: { text: 'Назад к чатам', href: '/chat' },
    });
