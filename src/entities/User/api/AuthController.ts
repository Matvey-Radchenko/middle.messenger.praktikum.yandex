import { LogInData, User } from '@entities/User';
import { AuthAPI } from './AuthAPI';
import { Router, Store } from '@shared/lib';
import { loadingDecorator } from '@shared/ui';

class AuthController {
    @loadingDecorator('Создаём пользователя...')
    signup(user: User) {
        return AuthAPI.signup(user).then((response) => {
            if (response.status === 200) {
                this.getUser();
                Router.instance.go('/chat');
            }
        });
    }

    @loadingDecorator('Выполняем вход...')
    signin(loginData: LogInData) {
        return AuthAPI.signin(loginData).then((response) => {
            if (response.status === 200) {
                this.getUser().then((response) => {
                    if (response?.status === 200) {
                        Router.instance.go('/chat');
                    }
                });
            }
        });
    }

    @loadingDecorator('Загружаем данные пользователя...')
    getUser() {
        return AuthAPI.get().then((response) => {
            if (response.status === 200) {
                Store.set('user', JSON.parse(response.response));
                Store.set('isAuth', true);

                return response;
            }
        });
    }

    @loadingDecorator('Выход...')
    logout() {
        return AuthAPI.logout().then((response) => {
            if (response.status === 200) {
                Store.set('user', null);
                Store.set('isAuth', false);
                Router.instance.go('/login');
            }
        });
    }
}

const instance = new AuthController();

export { instance as AuthController };
