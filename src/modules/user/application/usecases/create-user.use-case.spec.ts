import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = {
      create: jest.fn((user: User) => user),
    };

    useCase = new CreateUserUseCase(userRepository);
  });

  it('should be create an user', () => {
    const input = {
      name: 'Wendel',
      email: 'wendel@email.com',
      password: '123456',
    };

    const result = useCase.execute(input);

    expect(result).toBeInstanceOf(User);
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(userRepository.create).toHaveBeenCalledTimes(1);
    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: input.name,
        email: input.email,
      }),
    );
  });
});
