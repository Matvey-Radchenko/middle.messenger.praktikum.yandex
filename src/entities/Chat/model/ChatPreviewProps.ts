import { Message } from '@entities';

export type ChatPreviewProps = {
    name: string;
    imageSrc: string;
    lastMessage: Message;
    unreadMessages?: number;
};
