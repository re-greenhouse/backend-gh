import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcToHttpInterceptor } from 'nestjs-grpc-exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new GrpcToHttpInterceptor());
  // app.useGlobalGuards(new AccessTokenGuard());
  await app.listen(3000);
}
bootstrap();
