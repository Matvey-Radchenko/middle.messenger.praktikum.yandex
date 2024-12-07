import { UserData } from '@entities/index';

export type CreateAccountFormData = UserData & { passwordRepeat: string };
