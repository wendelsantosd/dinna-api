import { Module } from '@nestjs/common';
import { BcryptService } from './infra/encryptation/bcrypt.service';
import { PrismaService } from './infra/database/prisma.service';
import { ENCRYPTATION } from './domain/encryptation/tokens/encryptation.tokens';

@Module({
  providers: [
    {
      provide: ENCRYPTATION,
      useClass: BcryptService,
    },
    PrismaService,
  ],
  exports: [PrismaService, ENCRYPTATION],
})
export class SharedModule {}
