import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as randomstring from 'randomstring';
import { INVALID_CREDENTIAL } from './auth.constants';

@Injectable()
export class CryptoService {
  public async getHash(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  public async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    const checkPassword = await bcrypt.compare(password, passwordHash);
    if (!checkPassword) {
      throw new UnauthorizedException(INVALID_CREDENTIAL);
    }
    return Promise.resolve(true);
  }

  public generatedNewPassword(options: randomstring.GenerateOptions): string {
    return randomstring.generate(options);
  }
}
