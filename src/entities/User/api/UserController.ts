import { UpdateUserPassword } from '../model/types/UpdateUserPassword';
import { UserAPI } from './UserAPI';
import { loadingDecorator } from '@shared/ui';
import { Store } from '@shared/lib';
import { User } from '@entities/User/model/types/User';

class UserController {
    @loadingDecorator('Обновляем профиль...')
    updateProfile(data: Parameters<typeof UserAPI.updateProfile>[0]) {
        return UserAPI.updateProfile(data).then((response) => {
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

        return UserAPI.updateAvatar(formData).then((response) => {
            if (response.ok) {
                const user = Store.getState<User>('user');
                Store.set('user', { ...user, avatar: response.value.avatar });
            }

            return response;
        });
    }

    @loadingDecorator('Обновляем пароль...')
    updatePassword(data: UpdateUserPassword) {
        return UserAPI.updatePassword(data);
    }

    @loadingDecorator('Ищем пользователя...')
    search(login: string) {
        return UserAPI.search(login).then((response) => {
            if (response.ok) {
                return response.value;
            }

            return [];
        });
    }
}

const instance = new UserController();

export { instance as UserController };
