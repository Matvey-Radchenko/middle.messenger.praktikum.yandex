import { UserProfile } from '@entities/User';

export const USER_ATTRS_ORDER: Record<keyof UserProfile, number> = {
    email: 0,
    login: 1,
    first_name: 2,
    second_name: 3,
    display_name: 4,
    phone: 5,
};
