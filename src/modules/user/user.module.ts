import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './services/user.service';
import { CreateUserUseCase } from './application/usecases/create-user.use-case';
import { UserRepository } from './infra/repositories/user.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

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
  ],
})
export class UserModule {}
