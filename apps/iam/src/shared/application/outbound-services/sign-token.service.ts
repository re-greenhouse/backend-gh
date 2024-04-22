import { JwtService } from '@nestjs/jwt';
import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class SignTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signToken<T>(username: string, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: username,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );
  }
}
