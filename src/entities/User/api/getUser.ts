import { MOCK_USER } from './mock/mockUser';
import { User } from '../model/types/User';
import { delay } from '@shared/lib';

export const logIn = async (): Promise<User> => {
    await delay(300);
    return Promise.resolve(MOCK_USER);
};
