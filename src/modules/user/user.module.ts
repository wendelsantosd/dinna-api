import { Module } from '@nestjs/common';
import { UserController } from './presentation/user.controller';
import { UserService } from './services/user.service';
import { InMemoryUserRepository } from './infra/repositories/in-memory-user.repository';
import { CreateUserUseCase } from './application/usecases/create-user.use-case';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    {
      provide: 'UserRepository',
      useClass: InMemoryUserRepository,
    },
  ],
})
export class UserModule {}
