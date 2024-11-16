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
      provide: CreateMembershipPaymentRepository,
      useClass: OrmCreateMembershipPaymentRepository,
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
    CreateMembershipPaymentRepository,
    FindMembershipsRepository,
    FindMembershipLevelsRepository,
  ],
})
export class OrmMembershipsPersistenceModule {}