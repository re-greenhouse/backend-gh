import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '172.16.238.14',
      port: 5436,
      password: 'pass123',
      username: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  exports: [],
})
export class CoreModule {}
