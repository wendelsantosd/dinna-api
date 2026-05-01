import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthUserInput, AuthUserOutput } from './interfaces';
import type { IUserRepository } from '../../../user/domain/repositories/user.repository';
import type { IEncryptation } from '../../../../shared/infra/encryptation/encryptation.service';
import { ENCRYPTATION } from '../../../../shared/domain/encryptation/tokens/encryptation.tokens';
import { USER_REPOSITORY } from '../../../../modules/user/domain/tokens/user-repository.token';

@Injectable()
export class AuthUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(ENCRYPTATION) private readonly bcryptService: IEncryptation,
  ) {}

  async execute({ email, password }: AuthUserInput): Promise<AuthUserOutput> {
    const incorrectCredentialMessage = 'Email or password incorrect';

    const user = await this.userRepository.findUserByEmail({ email });

    if (!user) throw new BadRequestException(incorrectCredentialMessage);

    const isValidPassword = await this.bcryptService.compare({
      hash: user.password,
      password,
    });

    if (!isValidPassword)
      throw new BadRequestException(incorrectCredentialMessage);

    return {
      token: 'TESTE',
    };
  }
}
