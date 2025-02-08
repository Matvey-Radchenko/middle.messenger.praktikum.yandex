import { USER_REG_EXPS } from '@entities/User';

export const PASSWORD_INPUTS = [
    {
        name: 'oldPassword',
        type: 'password',
        placeholder: 'Старый пароль',
        validation: USER_REG_EXPS.password,
    },
    {
        name: 'newPassword',
        type: 'password',
        placeholder: 'Новый пароль',
        validation: USER_REG_EXPS.password,
    },
    {
        name: 'newPasswordRepeat',
        type: 'password',
        placeholder: 'Повторите новый пароль',
        validation: USER_REG_EXPS.password,
    },
] as const;
