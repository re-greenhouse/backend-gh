import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<string>;
  abstract compare(
    plainText: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
