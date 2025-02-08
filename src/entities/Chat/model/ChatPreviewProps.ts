import { Chat } from '@entities/Chat';

export type ChatPreviewProps = {
    id: number;
    title: string;
    avatar: string;
    last_message: Chat['last_message'] & { outgoing: boolean };
    unread_count?: number;
    onclick?: () => void;
};
