import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CROPS_SERVICE } from './constants';
import { CROPS_PACKAGE_NAME } from '@app/common/types/crops';
import { join } from 'path';
import { CropsController } from './controllers/crops.controller';
import { RecordsController } from './controllers/records.controller';
import { CropsService } from './services/crops.service';
import { RecordsService } from './services/records.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CROPS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: CROPS_PACKAGE_NAME,
          protoPath: join(__dirname, '../crops.proto'),
          url: 'localhost:5002',
        },
      },
    ]),
  ],
  controllers: [CropsController, RecordsController],
  providers: [CropsService, RecordsService],
})
export class CropsModule {}
