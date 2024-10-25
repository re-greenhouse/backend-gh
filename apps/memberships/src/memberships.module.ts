import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, MembershipsModule],
  controllers: [],
  providers: [],
})
export class MembershipsModule {}
