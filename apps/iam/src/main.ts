import { NestFactory } from '@nestjs/core';
import { IamModule } from './iam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { IAM_PACKAGE_NAME } from '@app/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IamModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../iam.proto'),
        package: IAM_PACKAGE_NAME,
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
