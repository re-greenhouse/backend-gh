import { Module } from '@nestjs/common';
import { MembershipsInfrastructureModule } from '../infrastructure/memberships-infrastructure.module';
import { MembershipsService } from './memberships.service';
import { MembershipFactory } from '../domain/factories/membership.factory';
import { CreateMembershipCommand } from './commands/create-membership.command';
import { CreateMembershipPaymentCommandHandler } from './commands/create-membership-payment.command-handler';
import { GetMembershipsByCompanyQuery } from './queries/get-memberships-by-company.query';
import { GetMembershipsByCompanyQueryHandler } from './queries/get-memberships-by-company.query-handler';
import { MembershipsPaymentService } from './memberships-payment.service';
import { MembershipPaymentFactory } from '../domain/factories/membershipPayment.factory';
import { CreateMembershipPaymentCommand } from './commands/create-membership-payment.command';
import { MembershipLevelService } from './membership-level.service';
import { GetMembershipsLevelByNameQuery } from './queries/get-memberships-level-by-name.query';
import { CreateMembershipCommandHandler } from './commands/create-membership.command-handler';
import { MembershipsController } from '../presenters/grpc/memberships.controller';
import { MembershipLevelsController } from '../presenters/grpc/membership-levels.controller';
import { MembershipPaymentsController } from '../presenters/grpc/membership-payments.controller';
import { MembershipLevelFactory } from '../domain/factories/membershipLevel.factory';
import { CreateMembershipLevelCommand } from './commands/create-membership-level.command';
import { CreateMembershipLevelCommandHandler } from './commands/create-membership-level.command-handler';
import { BenefitFactory } from '../domain/factories/benefit.factory';
import { GetMembershipsLevelByNameQueryHandler } from './queries/get-memberships-level-by-name.query-handler';
import { UpdateMembershipCommand } from './commands/update-membership.command';
import { UpdateMembershipCommandHandler } from './commands/update-membership.command-handler';

@Module({
  imports: [MembershipsInfrastructureModule],
  exports: [],
  providers: [
    MembershipsService,
    MembershipFactory,
    CreateMembershipCommand,
    CreateMembershipCommandHandler,
    GetMembershipsByCompanyQuery,
    GetMembershipsByCompanyQueryHandler,
    UpdateMembershipCommand,
    UpdateMembershipCommandHandler,
    MembershipsPaymentService,
    MembershipPaymentFactory,
    CreateMembershipPaymentCommand,
    CreateMembershipPaymentCommandHandler,
    MembershipLevelService,
    MembershipLevelFactory,
    CreateMembershipLevelCommand,
    CreateMembershipLevelCommandHandler,
    GetMembershipsLevelByNameQuery,
    GetMembershipsLevelByNameQueryHandler,
    BenefitFactory,
  ],
  controllers: [
    MembershipsController,
    MembershipLevelsController,
    MembershipPaymentsController,
  ],
})
export class MembershipsModule {}
