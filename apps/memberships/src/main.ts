import { NestFactory } from '@nestjs/core';
import { MembershipsModule } from './memberships.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MEMBERSHIPS_PACKAGE_NAME } from '@app/common/types/memberships';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MembershipsModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../memberships.proto'),
        package: MEMBERSHIPS_PACKAGE_NAME,
        url: 'localhost:5004',
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
