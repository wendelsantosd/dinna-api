import { User } from '../../domain/entities/user.entity';
import { randomUUID } from 'crypto';
import { InMemoryUserRepository } from '../../infra/repositories/in-memory-user.repository';
import { Inject, Injectable } from '@nestjs/common';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: InMemoryUserRepository,
  ) {}

  execute({ email, name, password }: CreateUserInput): User {
    const user = new User(randomUUID(), name, email, password);
    return this.userRepository.create(user);
  }
}
