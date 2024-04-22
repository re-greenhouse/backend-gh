import { Module } from '@nestjs/common';
import { AccessTokenGuard } from './guards/access-token.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { IAM_SERVICE } from '../iam/constants';
import { IAM_PACKAGE_NAME } from '@app/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: IAM_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: IAM_PACKAGE_NAME,
          protoPath: join(__dirname, '../iam.proto'),
        },
      },
    ]),
  ],
  providers: [
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AccessTokenGuard, RolesGuard],
})
export class SharedModule {}
