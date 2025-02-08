import { LogInData, UserProfile } from '@entities/User';
import { AuthAPI } from './AuthAPI';
import { Router, Store } from '@shared/lib';
import { loadingDecorator } from '@shared/ui';

class AuthController {
    @loadingDecorator('Создаём пользователя...')
    signup(user: UserProfile) {
        return AuthAPI.signup(user).then((response) => {
            if (response.ok) {
                this.getUser();
                Router.instance.go('/chat');
            }
        });
    }

    @loadingDecorator('Выполняем вход...')
    signin(loginData: LogInData) {
        return AuthAPI.signin(loginData).then((response) => {
            if (response.ok) {
                this.getUser().then((response) => {
                    if (response?.ok) {
                        Router.instance.go('/chat');
                    }
                });
            }
        });
    }

    @loadingDecorator('Загружаем данные пользователя...')
    getUser() {
        return AuthAPI.get().then((response) => {
            if (response.ok) {
                Store.set('user', response.value);
                Store.set('isAuth', true);

                return response;
            }
        });
    }

    @loadingDecorator('Выход...')
    logout() {
        return AuthAPI.logout().then((response) => {
            if (response.ok) {
                Store.set('user', null);
                Store.set('isAuth', false);
                Router.instance.go('/');
            }
        });
    }
}

const instance = new AuthController();

export { instance as AuthController };
