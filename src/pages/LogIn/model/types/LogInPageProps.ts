import { User } from '@entities';

export type LogInPageProps = {
    onLogIn: (data: User) => void;
};
