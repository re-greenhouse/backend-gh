import { NestFactory } from '@nestjs/core';
import { PersonasModule } from './personas.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { PERSONAS_PACKAGE_NAME } from '@app/common/types/personas';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PersonasModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../personas.proto'),
        package: PERSONAS_PACKAGE_NAME,
        url: 'localhost:5001',
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
