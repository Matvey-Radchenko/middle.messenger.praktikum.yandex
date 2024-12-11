import { User } from '@entities';

export type CreateAccountPageProps = {
    onCreateAccount: (data: User) => void;
};
