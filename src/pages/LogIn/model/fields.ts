import { LogInData } from '@entities';
import { TextInputProps } from '@shared/ui';

export const LOGIN_ACCOUNT_FIELDS: Array<TextInputProps & { name: keyof LogInData }> = [
    {
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        validation: {
            regExp: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
            errorText:
                'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов',
        },
    },
    {
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        validation: {
            regExp: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
            errorText:
                'от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
        },
    },
];
