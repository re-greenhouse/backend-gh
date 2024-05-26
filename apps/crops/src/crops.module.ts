import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';
import { CropsModule } from './crops/application/crops.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, CropsModule],
  controllers: [],
  providers: [],
})
export class CropsRecordsModule {}
