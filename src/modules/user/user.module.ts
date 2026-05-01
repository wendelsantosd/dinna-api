import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './application/usecases/create-user.use-case';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaService } from '../../shared/infra/database/prisma.service';
import { SharedModule } from 'src/shared/shared.module';
import { USER_REPOSITORY } from './domain/tokens/user-repository.token';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    CreateUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
