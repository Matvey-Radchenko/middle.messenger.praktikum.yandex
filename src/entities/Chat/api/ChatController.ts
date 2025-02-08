import { ChatAPI } from './ChatAPI';
import { loadingDecorator } from '@shared/ui';
import { Store } from '@shared/lib';

class ChatController {
    lastGetOptions: Parameters<typeof ChatAPI.getChats>[0] = {
        offset: 0,
        limit: 0,
        title: '',
    };

    @loadingDecorator('Загружаем чаты...')
    getChats(data: Parameters<typeof ChatAPI.getChats>[0]) {
        return ChatAPI.getChats(data).then((response) => {
            if (response.ok) {
                Store.set('chats', response.value);
                this.lastGetOptions = data;
            }

            return response;
        });
    }

    createChat(data: Parameters<typeof ChatAPI.createChat>[0]) {
        return ChatAPI.createChat(data).then((response) => {
            if (response.ok) {
                this.getChats(this.lastGetOptions);
            }

            return response;
        });
    }

    addUsersToChat(data: Parameters<typeof ChatAPI.addUsersToChat>[0]) {
        return ChatAPI.addUsersToChat(data);
    }

    deleteUsersFromChat(data: Parameters<typeof ChatAPI.deleteUsersFromChat>[0]) {
        return ChatAPI.deleteUsersFromChat(data);
    }
}

const instance = new ChatController();

export { instance as ChatController };
