import { Module } from '@nestjs/common';
import { ProfilesModule } from './profiles/application/profiles.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, ProfilesModule],
  controllers: [],
  providers: [],
})
export class PersonasModule {}
