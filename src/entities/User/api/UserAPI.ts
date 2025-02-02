import { LogInData, User } from '@entities/User';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');

class UserAPI {
    signup(payload: User) {
        return APIInstance.post('signup', { data: payload });
    }

    signin(loginData: LogInData) {
        return APIInstance.post('signin', { data: loginData });
    }

    logout() {
        return APIInstance.get('logout');
    }

    getUser() {
        return APIInstance.get('user');
    }
}

const instance = new UserAPI();

export { instance as UserAPI };
