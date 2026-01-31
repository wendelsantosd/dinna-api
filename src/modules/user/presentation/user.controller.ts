import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UserService } from '../services/user.service';
import { User } from '../domain/entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDTO);
  }
}
