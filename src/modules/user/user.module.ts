import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './application/usecases/create-user.use-case';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaService } from '../../shared/infra/database/prisma.service';
import { BcryptService } from '../../shared/infra/encryptation/bcrypt.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    {
      provide: 'BcryptService',
      useClass: BcryptService,
    },
  ],
})
export class UserModule {}
