import { User } from '@entities';

export type ProfilePageProps = User & {
    avatar?: string;
    editUser: boolean;
    editPassword: boolean;
};
