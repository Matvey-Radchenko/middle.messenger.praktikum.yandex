import { LogInData, User, UserProfile } from '@entities/User';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');

class AuthAPI {
    signup(payload: UserProfile) {
        return APIInstance.post('signup', {
            data: payload,
        });
    }

    signin(loginData: LogInData) {
        return APIInstance.post('signin', {
            data: loginData,
        });
    }

    logout() {
        return APIInstance.post('logout');
    }

    get() {
        return APIInstance.get<User>('user');
    }
}

const instance = new AuthAPI();

export { instance as AuthAPI };
