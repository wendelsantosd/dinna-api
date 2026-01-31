import { PrismaService } from 'src/shared/infra/database/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  FindUserByEmailInput,
  FindUserByEmailOutput,
} from '../../domain/repositories/interfaces';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: User): Promise<User> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while creating the user: ${error}`,
      );
    }
  }

  async findUserByEmail({
    email,
  }: FindUserByEmailInput): Promise<FindUserByEmailOutput> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        `An error occurred while finding the user: ${error}`,
      );
    }
  }
}
