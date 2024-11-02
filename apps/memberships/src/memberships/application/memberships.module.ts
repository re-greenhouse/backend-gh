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

@Module({
  imports: [MembershipsInfrastructureModule],
  exports: [],
  providers: [
    MembershipsService,
    MembershipFactory,
    CreateMembershipCommand,
    CreateMembershipPaymentCommandHandler,
    GetMembershipsByCompanyQuery,
    GetMembershipsByCompanyQueryHandler,
    MembershipsPaymentService,
    MembershipPaymentFactory,
    CreateMembershipPaymentCommand,
    CreateMembershipPaymentCommandHandler,
    MembershipLevelService,
    GetMembershipsLevelByNameQuery,
    GetMembershipsByCompanyQueryHandler,
  ],
  controllers: [],
})
export class MembershipsModule {}
