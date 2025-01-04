import { User } from '../model/types/User';
import { delay } from '@shared/lib';

export const createUser = async (data: User): Promise<User> => {
    await delay(300);
    return Promise.resolve(data);
};
