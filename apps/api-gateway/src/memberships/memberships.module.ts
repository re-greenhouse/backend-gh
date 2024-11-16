import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MEMBERSHIPS_SERVICE } from './constants';
import { MEMBERSHIPS_PACKAGE_NAME } from '@app/common/types/memberships';
import { join } from 'path';
import { MembershipsController } from './controllers/memberships.controller';
import { MembershipsService } from './services/memberships.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MEMBERSHIPS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MEMBERSHIPS_PACKAGE_NAME,
          protoPath: join(__dirname, '../memberships.proto'),
          url: 'localhost:5004',
        },
      },
    ]),
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
})
export class MembershipsModule {}
