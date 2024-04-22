import { Module } from '@nestjs/common';
import { UsersModule } from './users/application/users.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/application/auth.module';
import { SharedModule } from './shared/application/shared.module';

@Module({
  imports: [
    CqrsModule.forRoot(),
    CoreModule,
    UsersModule,
    AuthModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class IamModule {}
