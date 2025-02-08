import { Chat } from '@entities/Chat';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

class ChatAPI {
    getChats(data: { offset?: number; limit?: number; title?: string }) {
        return APIInstance.get<Array<Chat>>('', {
            data,
        });
    }

    createChat(data: { title: string }) {
        return APIInstance.post<{ id: number }>('', {
            data,
        });
    }

    addUsersToChat(data: { users: Array<number>; chatId: number }) {
        return APIInstance.put<'OK'>('/users', {
            data,
        });
    }

    deleteUsersFromChat(data: { users: Array<number>; chatId: number }) {
        return APIInstance.delete<'OK'>('/users', {
            data,
        });
    }

    getToken(data: { chatId: number }) {
        return APIInstance.post<{ token: string }>(`/token/${data.chatId}`);
    }
}

const instance = new ChatAPI();

export { instance as ChatAPI };
