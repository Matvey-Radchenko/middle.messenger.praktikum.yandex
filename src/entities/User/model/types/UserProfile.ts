import { User } from './User';

export type UserProfile = Omit<User, 'id' | 'avatar'>;
