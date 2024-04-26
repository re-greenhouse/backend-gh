import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalInterceptors(new GrpcToHttpInterceptor());
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

  const config = new DocumentBuilder()
    .setTitle('Greenhouse API')
    .setDescription(
      'Welcome to the Greenhouse Mushroom Harvest Backend API Documentation! This Swagger page provides a comprehensive overview of the endpoints and functionalities offered by our backend services. Developed using NestJS and designed with microservices architecture in mind, our API ensures efficient and scalable management of mushroom harvests within the Greenhouse project.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
