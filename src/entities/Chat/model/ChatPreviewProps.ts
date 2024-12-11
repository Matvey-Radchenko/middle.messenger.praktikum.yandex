import { Message } from '@entities';

export type ChatPreviewProps = {
    name: string;
    imageSrc: string;
    lastMessage: Message;
    isOwnMessage?: boolean;
    unreadMessages?: number;
};
