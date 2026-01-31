import { User } from '../entities/user.entity';

export type FindUserByEmailOutput = User | null;

export interface FindUserByEmailInput {
  email: string;
}
