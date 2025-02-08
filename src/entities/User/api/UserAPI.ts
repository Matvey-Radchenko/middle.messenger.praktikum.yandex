import { User } from '../model/types/User';
import { UpdateUserPassword } from '../model/types/UpdateUserPassword';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user/');

class UserAPI {
    updateProfile(data: Omit<User, 'id' | 'avatar'>) {
        return APIInstance.put<User>('profile', {
            data,
        });
    }

    updateAvatar(formData: FormData) {
        return APIInstance.put<User>('profile/avatar', {
            data: formData,
        });
    }

    updatePassword(data: UpdateUserPassword) {
        return APIInstance.put<'OK'>('password', {
            data,
        });
    }

    search(login: string) {
        return APIInstance.post<Array<User>>('search', {
            data: { login },
        });
    }
}

const instance = new UserAPI();

export { instance as UserAPI };
