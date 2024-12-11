import { LogInData } from '@entities';
import { TextInputProps } from '@shared';

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
