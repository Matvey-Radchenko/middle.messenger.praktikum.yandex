import { User } from '@entities/User';
import { UserAPI } from './UserAPI';
import store from '@shared/lib/block/store/store';
import { Router } from '@shared/lib';

class UserController {
    signup(user: User) {
        UserAPI.signup(user).then((response) => {
            store.set('user', user);
            Router.instance.go('/profile');
            console.log(document.cookie);
        });
    }
}

const instance = new UserController();

export { instance as UserController };
