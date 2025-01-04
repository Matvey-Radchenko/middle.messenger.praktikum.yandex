import { MOCK_USER } from './mock/mockUser';
import { User } from '../model/User';
import { delay } from '@shared/lib';
import { LogInData } from '../model/LogInData';

export const logIn = async (data: LogInData): Promise<User> => {
    await delay(300);
    return Promise.resolve(MOCK_USER);
};
