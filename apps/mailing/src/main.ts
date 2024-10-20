import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { CROPS_PACKAGE_NAME } from '@app/common/types/crops';
import { MailingModule } from './mailing.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailingModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../crops.proto'),
        package: CROPS_PACKAGE_NAME,
        url: 'localhost:5003',
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
