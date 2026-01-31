import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../application/usecases/create-user.use-case';
import { CreateUserDTO } from '../presentation/dtos/create-user.dto';
import { User } from '../domain/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  async createUser(data: CreateUserDTO): Promise<User> {
    return await this.createUserUseCase.execute(data);
  }
}
