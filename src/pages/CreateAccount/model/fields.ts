import { User } from '@entities';
import { TextInputProps } from '@shared';

export const CREATE_ACCOUNT_FIELDS: Array<TextInputProps & { name: keyof User }> = [
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
];
