import { User } from '../entities/user.entity';

export interface IUserRepository {
  create(user: User): User;
}
