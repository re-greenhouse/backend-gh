import {
  CreateMembershipPaymentDto,
  MembershipPayment,
  MembershipsPaymentServiceController,
  MembershipsPaymentServiceControllerMethods,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { MembershipsPaymentService } from '../application/memberships-payment.service';
import { CreateMembershipPaymentCommand } from '../application/commands/create-membership-payment.command';

@Controller()
@MembershipsPaymentServiceControllerMethods()
export class MembershipPaymentsController
  implements MembershipsPaymentServiceController
{
  constructor(
    private readonly membershipPaymentsService: MembershipsPaymentService,
  ) {}

  async createMembershipPayment(
    request: CreateMembershipPaymentDto,
  ): Promise<MembershipPayment> {
    return this.membershipPaymentsService.create(
      new CreateMembershipPaymentCommand(
        request.membershipId,
        request.amount,
        request.paymentDate,
        request.paymentMethod,
      ),
    );
  }
}
