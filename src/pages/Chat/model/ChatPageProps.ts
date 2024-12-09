import { ChatPreviewProps, Message } from '@entities/index';

export type ChatPageProps = {
    chats: Array<ChatPreviewProps>;
    messages: Array<Message>;
};
