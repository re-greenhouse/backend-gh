import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipEntity } from './entities/membership.entity';
import { MembershipLevelEntity } from './entities/membership-level.entity';
import { MembershipPaymentEntity } from './entities/membership-payment.entity';
import { CreateMembershipRepository } from '../../../application/ports/create-membership.repository';
import { OrmCreateMembershipRepository } from './repositories/create-membership.repository';
import { CreateMembershipPaymentRepository } from '../../../application/ports/create-membership-payment.repository';
import { OrmCreateMembershipPaymentRepository } from './repositories/create-membership-payment.repository';
import { FindMembershipsRepository } from '../../../application/ports/find-memberships.repository';
import { OrmFindMembershipsRepository } from './repositories/find-memberships.repository';
import { FindMembershipLevelsRepository } from '../../../application/ports/find-membership-levels.repository';
import { OrmFindMembershipLevelsRepository } from './repositories/find-membership-levels.repository';
import { BenefitEntity } from './entities/benefit.entity';
import { CreateMembershipLevelRepository } from '../../../application/ports/create-membership-level.repository';
import { OrmCreateMembershipLevelRepository } from './repositories/create-membership-level.repository';
import { CreateBenefitRepository } from '../../../application/ports/create-benefit.repository';
import { OrmCreateBenefitRepository } from './repositories/create-benefit.repository';
import { SaveMembershipRepository } from '../../../application/ports/save-membership.repository';
import { OrmSaveMembershipRepository } from './repositories/save-membership.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MembershipEntity,
      MembershipLevelEntity,
      MembershipPaymentEntity,
      BenefitEntity,
    ]),
  ],
  providers: [
    {
      provide: CreateMembershipRepository,
      useClass: OrmCreateMembershipRepository,
    },
    {
      provide: SaveMembershipRepository,
      useClass: OrmSaveMembershipRepository,
    },
    {
      provide: CreateMembershipPaymentRepository,
      useClass: OrmCreateMembershipPaymentRepository,
    },
    {
      provide: CreateMembershipLevelRepository,
      useClass: OrmCreateMembershipLevelRepository,
    },
    {
      provide: CreateBenefitRepository,
      useClass: OrmCreateBenefitRepository,
    },
    {
      provide: FindMembershipsRepository,
      useClass: OrmFindMembershipsRepository,
    },
    {
      provide: FindMembershipLevelsRepository,
      useClass: OrmFindMembershipLevelsRepository,
    },
  ],
  exports: [
    CreateMembershipRepository,
    SaveMembershipRepository,
    CreateMembershipPaymentRepository,
    CreateMembershipLevelRepository,
    CreateBenefitRepository,
    FindMembershipsRepository,
    FindMembershipLevelsRepository,
  ],
})
export class OrmMembershipsPersistenceModule {}
