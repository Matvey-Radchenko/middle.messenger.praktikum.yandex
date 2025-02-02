import { User, USER_REG_EXPS } from '@entities';
import { USER_PROP_NAMES } from '@entities/User/model/userPropNames';
import { TextInputProps } from '@shared/ui';

export const CREATE_ACCOUNT_FIELDS: Array<
    TextInputProps & { name: keyof User | 'password' | 'password_repeat' }
> = [
    {
        name: 'email',
        type: 'email',
        placeholder: USER_PROP_NAMES.email,
        validation: USER_REG_EXPS.email,
    },
    {
        name: 'login',
        type: 'text',
        placeholder: USER_PROP_NAMES.login,
        validation: USER_REG_EXPS.login,
    },
    {
        name: 'first_name',
        type: 'text',
        placeholder: USER_PROP_NAMES.first_name,
        validation: USER_REG_EXPS.first_name,
    },
    {
        name: 'second_name',
        type: 'text',
        placeholder: USER_PROP_NAMES.second_name,
        validation: USER_REG_EXPS.second_name,
    },
    {
        name: 'phone',
        type: 'tel',
        placeholder: USER_PROP_NAMES.phone,
        validation: USER_REG_EXPS.phone,
    },
    {
        name: 'password',
        type: 'password',
        placeholder: USER_PROP_NAMES.password,
        validation: USER_REG_EXPS.password,
    },
    {
        name: 'password_repeat',
        type: 'password',
        placeholder: 'Пароль',
        validation: {
            regExp: USER_REG_EXPS.password!.regExp,
            errorText: 'Пароли не совпадают',
        },
    },
];
