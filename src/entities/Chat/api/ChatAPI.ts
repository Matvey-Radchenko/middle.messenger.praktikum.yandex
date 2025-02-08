import { Chat } from '@entities/Chat';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats/');

class ChatAPI {
    getChats(data: { offset: number; limit: number; title: string }) {
        return APIInstance.get<Array<Chat>>('', {
            data,
        });
    }

    createChat(data: { title: string }) {
        return APIInstance.post<{ id: number }>('', {
            data,
        });
    }
}

const instance = new ChatAPI();

export { instance as ChatAPI };
