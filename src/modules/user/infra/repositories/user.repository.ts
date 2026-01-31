import { PrismaService } from 'src/shared/services/prisma.service';
import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

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
        `Ocorreu um erro ao criar o usuário: ${error}`,
      );
    }
  }
}
