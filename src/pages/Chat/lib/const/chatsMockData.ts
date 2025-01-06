import { ChatPreviewProps } from '@entities';

export const CHATS_MOCK_DATA: Array<ChatPreviewProps> = [
    {
        name: 'Кот',
        avatar: {
            src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Felis_silvestris_silvestris.jpg/275px-Felis_silvestris_silvestris.jpg',
            initials: 'C',
        },
        lastMessage: {
            text: 'спишь?)) 👉👈',
            time: '00:02',
            outgoing: false,
        },
        unreadMessages: 1,
    },
    {
        name: 'Костя Архипов',
        avatar: {
            src: 'https://via.placeholder.com/150',
            initials: 'KA',
        },
        lastMessage: {
            text: 'У тебя дев работает?',
            time: '12:00',
            outgoing: false,
        },
        unreadMessages: 2,
    },
    {
        name: 'Pepe The Frog',
        avatar: {
            src: 'https://cdn33.printdirect.ru/cache/product/4b/2f/8379032/tov/all/480z480_front_2259_0_0_0_81d8b4ad492b973eb46829535eb4.jpg',
            initials: 'PTF',
        },
        lastMessage: {
            text: '...',
            time: '14:20',
            outgoing: false,
        },
        unreadMessages: 1,
    },
];
