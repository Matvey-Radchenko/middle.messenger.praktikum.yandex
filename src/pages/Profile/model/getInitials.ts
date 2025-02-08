import { User } from '@entities/User';

export const getInitials = ({ first_name, second_name }: User) => {
    return first_name && second_name ? `${first_name[0]}${second_name[0]}` : '';
};
