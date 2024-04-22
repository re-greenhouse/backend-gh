import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserRepository } from '../../../application/ports/create-user.repository';
import { OrmCreateUserRepository } from './repositories/create-user.repository';
import { FindUsersRepository } from '../../../application/ports/find-users.repository';
import { OrmFindUsersRepository } from './repositories/find-users.repository';
import { SaveUserRepository } from '../../../application/ports/save-user.repository';
import { OrmSaveUserRepository } from './repositories/save-user.repository';
import { RemoveUserRepository } from '../../../application/ports/remove-user.repository';
import { OrmRemoveUserRepository } from './repositories/remove-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: CreateUserRepository,
      useClass: OrmCreateUserRepository,
    },
    {
      provide: FindUsersRepository,
      useClass: OrmFindUsersRepository,
    },
    {
      provide: SaveUserRepository,
      useClass: OrmSaveUserRepository,
    },
    {
      provide: RemoveUserRepository,
      useClass: OrmRemoveUserRepository,
    },
  ],
  exports: [
    CreateUserRepository,
    FindUsersRepository,
    SaveUserRepository,
    RemoveUserRepository,
  ],
})
export class OrmUserPersistenceModule {}
