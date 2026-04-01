import { BadRequestException } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import type { IUserRepository } from '../../domain/repositories/user.repository';
import type { IEncryptation } from '../../../../shared/infra/encryptation/encryptation.service';

import {
  isStrongPassword,
  isValidEmail,
} from '../../../../shared/utils/validate';

jest.mock('../../../../shared/utils/validate', () => ({
  isValidEmail: jest.fn(),
  isStrongPassword: jest.fn(),
}));

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;
  let bcryptService: jest.Mocked<IEncryptation>;

  beforeEach(() => {
    userRepository = {
      create: jest.fn(),
      findUserByEmail: jest.fn(),
    };

    bcryptService = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    useCase = new CreateUserUseCase(userRepository, bcryptService);
  });

  it('should throw if email is invalid', async () => {
    (isValidEmail as jest.Mock).mockReturnValue(false);

    await expect(
      useCase.execute({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'StrongPass123!',
      }),
    ).rejects.toThrow(new BadRequestException('Invalid email format'));
    expect(isValidEmail).toHaveBeenCalledWith('invalid-email');
    expect(userRepository.findUserByEmail).not.toHaveBeenCalled();
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw if email is already in use', async () => {
    userRepository.findUserByEmail.mockResolvedValue({
      id: 'f236206c-321d-454e-be01-2880d1c4440d',
      name: 'John Doe',
      email: 'johndoe@provider.com',
      password: 'password_test',
    });

    (isValidEmail as jest.Mock).mockReturnValue(true);

    await expect(
      useCase.execute({
        name: 'John Sam Doe',
        email: 'johndoe@provider.com',
        password: 'StrongPass123!',
      }),
    ).rejects.toThrow(new BadRequestException('Email is already in use'));
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith({
      email: 'johndoe@provider.com',
    });
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should throw if password is weak', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isStrongPassword as jest.Mock).mockReturnValue(false);

    await expect(
      useCase.execute({
        name: 'John Doe',
        email: 'johndoe@provider.com',
        password: 'weak-password',
      }),
    ).rejects.toThrow(new BadRequestException('Choose a strong password'));

    expect(isStrongPassword).toHaveBeenCalledWith('weak-password');
    expect(bcryptService.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });

  it('should create user successfully', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isStrongPassword as jest.Mock).mockReturnValue(true);

    bcryptService.hash.mockResolvedValue('hashedPassword');

    userRepository.create.mockResolvedValue({
      id: 'f236206c-321d-454e-be01-2880d1c4440d',
      name: 'Wendel',
      email: 'wendel@provider.com',
      password: 'hashedPassword',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    });

    const result = await useCase.execute({
      name: 'Wendel',
      email: 'wendel@provider.com',
      password: 'StrongPass123!',
    });

    expect(userRepository.findUserByEmail).toHaveBeenCalledWith({
      email: 'wendel@provider.com',
    });
    expect(bcryptService.hash).toHaveBeenCalledWith({
      password: 'StrongPass123!',
    });
    expect(userRepository.create).toHaveBeenCalled();
    expect(result).toEqual({
      id: 'f236206c-321d-454e-be01-2880d1c4440d',
      name: 'Wendel',
      email: 'wendel@provider.com',
      createdAt: new Date('2026-01-01'),
      updatedAt: new Date('2026-01-01'),
    });
  });

  it('should ensure password stored is hashed', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    (isValidEmail as jest.Mock).mockReturnValue(true);
    (isStrongPassword as jest.Mock).mockReturnValue(true);

    bcryptService.hash.mockResolvedValue('hashedPassword');

    userRepository.create.mockImplementation(async (user) => {
      expect(user.password).toBe('hashedPassword');

      return Promise.resolve({
        ...user,
        id: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await useCase.execute({
      name: 'Test',
      email: 'test@email.com',
      password: 'StrongPass123!',
    });

    expect(bcryptService.hash).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
  });
});
