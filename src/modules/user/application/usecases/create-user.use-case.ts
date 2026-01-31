import { User } from '../../domain/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../../domain/repositories/user.repository';

interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ email, name, password }: CreateUserInput): Promise<User> {
    const user = new User(name, email, password);
    return await this.userRepository.create(user);
  }
}
