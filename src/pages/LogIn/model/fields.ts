import { LogInData, USER_REG_EXPS } from '@entities';
import { TextInputProps } from '@shared/ui';

export const LOGIN_ACCOUNT_FIELDS: Array<TextInputProps & { name: keyof LogInData }> = [
    {
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        validation: USER_REG_EXPS.login,
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        validation: USER_REG_EXPS.password,
    },
];
