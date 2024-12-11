import { TextInputProps } from '@shared';
import { CreateAccountFormData } from './types/CreateAccountFormData';

type CreateAccountFormDataKeys = keyof CreateAccountFormData;

export const CREATE_ACCOUNT_FIELDS: Array<
    TextInputProps & { name: CreateAccountFormDataKeys }
> = [
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
