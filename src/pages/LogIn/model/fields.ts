import { LogInData } from '@entities';
import { TextInputProps } from '@shared/ui';

export const LOGIN_ACCOUNT_FIELDS: Array<TextInputProps & { name: keyof LogInData }> = [
    {
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
    },
];
