import { NestFactory } from '@nestjs/core';
import { CropsModule } from './crops.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { CROPS_PACKAGE_NAME } from '@app/common/types/crops';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CropsModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../crops.proto'),
        package: CROPS_PACKAGE_NAME,
        url: 'localhost:5002',
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen();
}
bootstrap();
