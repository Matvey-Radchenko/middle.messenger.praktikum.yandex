import { ChatPreviewProps } from '@entities';

export const CHATS_MOCK_DATA: Array<ChatPreviewProps> = [
    {
        title: 'Кот',
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Felis_silvestris_silvestris.jpg/275px-Felis_silvestris_silvestris.jpg',
        last_message: {
            text: 'спишь?)) 👉👈',
            time: '00:02',
            outgoing: false,
        },
        unread_count: 1,
    },
    {
        title: 'Костя Архипов',
        avatar: 'https://via.placeholder.com/150',
        last_message: {
            text: 'У тебя дев работает?',
            time: '12:00',
            outgoing: false,
        },
        unread_count: 2,
    },
    {
        title: 'Pepe The Frog',
        avatar: 'https://cdn33.printdirect.ru/cache/product/4b/2f/8379032/tov/all/480z480_front_2259_0_0_0_81d8b4ad492b973eb46829535eb4.jpg',
        last_message: {
            text: '...',
            time: '14:20',
            outgoing: false,
        },
        unread_count: 1,
    },
];
