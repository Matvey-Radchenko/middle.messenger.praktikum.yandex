import { UserData } from '@entities/index';

export type LoginFormData = Pick<UserData, 'login' | 'password'>;
