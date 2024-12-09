import { Message } from '@entities/index';

export type ChatPreviewProps = {
    name: string;
    imageSrc: string;
    lastMessage: Message;
    isOwnMessage?: boolean;
    unreadMessages?: number;
};
