import { User } from '../entities/user.entity';
import { FindUserByEmailInput, FindUserByEmailOutput } from './interfaces';

export interface IUserRepository {
  create(data: User): Promise<User>;
  findUserByEmail({
    email,
  }: FindUserByEmailInput): Promise<FindUserByEmailOutput>;
}
