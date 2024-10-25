import { NestFactory } from '@nestjs/core';
import { MembershipsModule } from './memberships.module';

async function bootstrap() {
  const app = await NestFactory.create(MembershipsModule);
  await app.listen(3000);
}
bootstrap();
