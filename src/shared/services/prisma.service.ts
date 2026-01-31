import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');
    console.log('URL', connectionString);

    if (!connectionString) {
      throw new Error('DATABASE_URL is undefined');
    }

    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }
}
