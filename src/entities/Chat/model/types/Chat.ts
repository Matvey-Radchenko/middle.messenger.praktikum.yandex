import { User } from '@entities/User';

export type Chat = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    created_by: number;
    last_message: {
        user: User;
        /** ISO */
        time: string;
        content: string;
    };
};
