import { InputProps } from '@shared/index';

export const CREATE_ACCOUNT_FIELDS: Array<InputProps> = [
    {
        name: 'email',
        type: 'email',
        placeholder: 'Почта',
    },
    {
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
    },
    {
        name: 'first_name',
        type: 'text',
        placeholder: 'Имя',
    },
    {
        name: 'second_name',
        type: 'text',
        placeholder: 'Фамилия',
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
    },
    {
        name: 'passwordRepeat',
        type: 'password',
        placeholder: 'Пароль (ещё раз)',
    },
];
