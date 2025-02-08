import { ChatAPI } from './ChatAPI';
import { loadingDecorator } from '@shared/ui';
import { Store } from '@shared/lib';

class ChatController {
    @loadingDecorator('Обновляем профиль...')
    updateProfile(data: Parameters<typeof ChatAPI.updateProfile>[0]) {
        return ChatAPI.updateProfile(data).then((response) => {
            if (response.ok) {
                Store.set('user', response.value);
            }

            return response;
        });
    }

    @loadingDecorator('Обновляем аватар...')
    updateAvatar(file: File) {
        const formData = new FormData();
        formData.append('avatar', file);

        return ChatAPI.updateAvatar(formData).then((response) => {
            if (response.ok) {
                Store.set('user.avatar', response.value.avatar);
            }

            return response;
        });
    }

    @loadingDecorator('Обновляем пароль...')
    updatePassword(data: UpdateUserPassword) {
        return ChatAPI.updatePassword(data);
    }

    @loadingDecorator('Ищем пользователя...')
    search(login: string) {
        return ChatAPI.search(login).then((response) => {
            if (response.ok) {
                return response.value;
            }

            return [];
        });
    }
}

const instance = new ChatController();

export { instance as ChatController };
