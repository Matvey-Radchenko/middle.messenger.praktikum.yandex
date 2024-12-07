import { TextInputProps } from '@shared/index';
import { LoginFormData } from './types/LogInFormData';

type LoginAccountFormDataKeys = keyof LoginFormData;

export const LOGIN_ACCOUNT_FIELDS: Array<
    TextInputProps & { name: LoginAccountFormDataKeys }
> = [
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
