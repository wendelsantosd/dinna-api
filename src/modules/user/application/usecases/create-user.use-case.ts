import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import type { IUserRepository } from '../../domain/repositories/user.repository';
import {
  isStrongPassword,
  isValidEmail,
} from '../../../../shared/utils/validate';
import type { IEncryptation } from '../../../../shared/infra/encryptation/encryptation.service';
import { CreateUserInput, CreateUserOutput } from './interfaces';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('BcryptService')
    private readonly bcryptService: IEncryptation,
  ) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const userExists = await this.userRepository.findUserByEmail({ email });

    if (userExists) throw new BadRequestException('Email is already in use');

    if (!isValidEmail(email))
      throw new BadRequestException('Invalid email format');

    if (!isStrongPassword(password))
      throw new BadRequestException('Choose a strong password');

    const hashPassword = await this.bcryptService.hash({ password });

    const userInput = new User(name, email, hashPassword);

    const user = await this.userRepository.create(userInput);

    return {
      id: user.id!,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!,
    };
  }
}
