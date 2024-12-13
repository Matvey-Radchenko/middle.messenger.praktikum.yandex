import { MESSAGES_MOCK_DATA } from '@pages/Chat/lib/const/messagesMockData';
import { CHATS_MOCK_DATA } from '../lib/const/chatsMockData';
import { ChatPageTemplate } from '@pages/Chat/ui';
import { Page } from '@shared';

export class ChatPage implements Page {
    render() {
        return ChatPageTemplate({
            chats: CHATS_MOCK_DATA,
            messages: MESSAGES_MOCK_DATA,
        });
    }
}
