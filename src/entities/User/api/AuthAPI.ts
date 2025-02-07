import { LogInData, User } from '@entities/User';
import { HTTPTransport } from '@shared/lib';

const APIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth/');

class AuthAPI {
    signup(payload: User) {
        return APIInstance.post('signup', {
            data: payload,
            headers: {
                accept: 'application/json',
            },
        });
    }

    signin(loginData: LogInData) {
        return APIInstance.post('signin', {
            data: loginData,
            headers: {
                accept: 'application/json',
            },
        });
    }

    logout() {
        return APIInstance.post('logout');
    }

    get() {
        return APIInstance.get('user', {
            headers: {
                accept: 'application/json',
            },
        });
    }
}

const instance = new AuthAPI();

export { instance as AuthAPI };
