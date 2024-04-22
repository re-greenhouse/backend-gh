import { Module } from '@nestjs/common';
import { OrmUserPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  controllers: [],
  imports: [OrmUserPersistenceModule],
  exports: [OrmUserPersistenceModule],
})
export class UsersInfrastructureModule {
  // static use(driver: 'orm' | 'in-memory') {
  //   const persistenceModule =
  //     driver === 'orm'
  //       ? OrmUserPersistenceModule
  //       : InMemoryUserPersistenceModule;
  //
  //   return {
  //     module: UsersInfrastructureModule,
  //     imports: [persistenceModule],
  //     exports: [persistenceModule],
  //   };
  // }
}
