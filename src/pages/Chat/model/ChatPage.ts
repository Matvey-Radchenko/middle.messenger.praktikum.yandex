import { CHATS_MOCK_DATA } from '../lib/const/chatsMockData';
import { ChatPageTemplate } from '@pages/Chat/ui';
import { Page } from '@shared/index';

export class ChatPage implements Page {
    attachListeners(): void {
        throw new Error('Method not implemented.');
    }

    render() {
        return ChatPageTemplate({
            chats: CHATS_MOCK_DATA,
            messages: [
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '11:56',
                    outgoing: false,
                },
                {
                    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
                    time: '12:00',
                    outgoing: true,
                },
            ],
        });
    }
}
