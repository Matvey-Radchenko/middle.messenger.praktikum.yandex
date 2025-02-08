import { User } from '@entities/User';

export const getInitials = (user?: User) => {
    const { first_name, second_name } = user || {};

    return first_name && second_name ? `${first_name[0]}${second_name[0]}` : '';
};
