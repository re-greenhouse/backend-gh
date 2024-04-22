import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { TokenValidationStatus } from '@app/common';

@Injectable()
export class TokenValidationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async isValid(token: string): Promise<TokenValidationStatus> {
    try {
      const response = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      return {
        isValid: true,
        info: response,
      };
    } catch {
      return { isValid: false };
    }
  }
}
