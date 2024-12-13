import { ChatPreviewProps, Message } from '@entities';

export type ChatPageProps = {
    chats: Array<ChatPreviewProps>;
    messages: Array<Message>;
};
