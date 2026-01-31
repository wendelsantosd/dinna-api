import { Injectable } from '@nestjs/common';
import { IEncryptation, Input } from './encryptation.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements IEncryptation {
  async hash({ password }: Omit<Input, 'hash'>): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
  async compare({ password, hash }: Input): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
