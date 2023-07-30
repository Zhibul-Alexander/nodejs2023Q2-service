import { User } from './user.dto';

export type UserResponse = Omit<User, 'password'>;
