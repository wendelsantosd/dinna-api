import { Injectable } from '@nestjs/common';
import { AuthDTO } from '../presentation/dtos/auth.dto';
import { AuthUserUseCase } from '../application/usecases/auth-user.use-case';

@Injectable()
export class AuthService {
  constructor(private readonly authUserUseCase: AuthUserUseCase) {}

  async signIn(data: AuthDTO): Promise<{ token: string }> {
    return await this.authUserUseCase.execute(data);
  }
}
