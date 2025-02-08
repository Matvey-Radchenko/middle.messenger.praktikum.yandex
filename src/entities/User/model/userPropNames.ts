import { UserProfile } from '@entities/User';

export const USER_PROP_NAMES: Record<
    keyof UserProfile | 'password' | 'password_repeat',
    string
> = {
    email: 'Почта',
    login: 'Логин',
    first_name: 'Имя',
    second_name: 'Фамилия',
    display_name: 'Имя в чате',
    phone: 'Телефон',
    password: 'Пароль',
    password_repeat: 'Повторите пароль',
};
