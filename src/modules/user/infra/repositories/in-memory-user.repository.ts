import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [];
  create(data: User): User {
    this.users.push(data);
    return data;
  }
}
