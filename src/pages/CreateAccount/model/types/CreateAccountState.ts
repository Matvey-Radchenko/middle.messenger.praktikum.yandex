import { UserData } from '@entities/index';

export type CreateAccountState = UserData & { passwordRepeat: string };
