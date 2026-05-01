import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthUserUseCase } from './application/usecases/auth-user.use-case';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [UserModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, AuthUserUseCase],
})
export class AuthModule {}
