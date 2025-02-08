import { USER_REG_EXPS } from '@entities/User';

export const USER_PROFILE_INPUTS = [
    {
        name: 'email',
        type: 'email',
        validation: USER_REG_EXPS.email,
    },
    { name: 'login', type: 'text', validation: USER_REG_EXPS.login },
    {
        name: 'first_name',
        type: 'text',
        validation: USER_REG_EXPS.first_name,
    },
    {
        name: 'second_name',
        type: 'text',
        validation: USER_REG_EXPS.second_name,
    },
    {
        name: 'display_name',
        type: 'text',
        validation: USER_REG_EXPS.display_name,
    },
    { name: 'phone', type: 'tel', validation: USER_REG_EXPS.phone },
] as const;
