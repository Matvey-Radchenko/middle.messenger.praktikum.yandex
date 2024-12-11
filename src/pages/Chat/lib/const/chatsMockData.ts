import { ChatPreviewProps } from '@entities';

export const CHATS_MOCK_DATA: Array<ChatPreviewProps> = [
    {
        name: 'ФСБ',
        imageSrc: 'https://via.placeholder.com/150',
        lastMessage: {
            text: 'спишь?))',
            time: '00:02',
            sender: 'user',
        },
        isOwnMessage: true,
    },
    {
        name: 'Костя Архипов',
        imageSrc: 'https://via.placeholder.com/150',
        lastMessage: {
            text: 'У тебя инт работает?',
            time: '12:00',
            sender: 'user',
        },
        isOwnMessage: false,
        unreadMessages: 2,
    },
    {
        name: 'Pepe The Frog',
        imageSrc:
            'https://cdn33.printdirect.ru/cache/product/4b/2f/8379032/tov/all/480z480_front_2259_0_0_0_81d8b4ad492b973eb46829535eb4.jpg',
        lastMessage: {
            text: 'Давай давай',
            time: '14:20',
            sender: 'user',
        },
        isOwnMessage: false,
        unreadMessages: 1,
    },
];
