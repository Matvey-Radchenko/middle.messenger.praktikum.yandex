import { User } from '@entities';

export const USER_PROP_NAMES: Record<keyof User, string> = {
    email: 'Почта',
    login: 'Логин',
    first_name: 'Имя',
    second_name: 'Фамилия',
    display_name: 'Имя в чате',
    phone: 'Телефон',
};
