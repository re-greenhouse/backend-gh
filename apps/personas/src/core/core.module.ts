import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      password: 'pass123',
      username: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  exports: [],
})
export class CoreModule {}
