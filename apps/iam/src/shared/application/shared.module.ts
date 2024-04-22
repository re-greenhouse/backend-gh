import { Module } from '@nestjs/common';
import { HashingService } from './outbound-services/hashing.service';
import { BcryptService } from './outbound-services/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { SignTokenService } from './outbound-services/sign-token.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { TokenValidationService } from './outbound-services/token-validation.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    SignTokenService,
    TokenValidationService,
  ],
  exports: [HashingService, SignTokenService, TokenValidationService],
})
export class SharedModule {}
