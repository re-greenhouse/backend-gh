import { HashingService } from './hashing.service';
import { Injectable } from '@nestjs/common';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(plainText: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(plainText, encrypted);
  }
}
