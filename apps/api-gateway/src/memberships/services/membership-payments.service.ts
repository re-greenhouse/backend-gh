import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MEMBERSHIPS_PAYMENT_SERVICE_NAME,
  MEMBERSHIPS_SERVICE_NAME,
  MembershipsPaymentServiceClient,
} from '@app/common/types/memberships';
import { MEMBERSHIPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateMembershipPaymentDto } from '../dto/create-membership-payment.dto';

@Injectable()
export class MembershipPaymentsService implements OnModuleInit {
  private membershipPaymentsService: MembershipsPaymentServiceClient;

  constructor(
    @Inject(MEMBERSHIPS_SERVICE) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.membershipPaymentsService =
      this.client.getService<MembershipsPaymentServiceClient>(
        MEMBERSHIPS_PAYMENT_SERVICE_NAME,
      );
  }

  create(createMembershipPaymentDto: CreateMembershipPaymentDto) {
    return this.membershipPaymentsService.createMembershipPayment({
      membershipId: createMembershipPaymentDto.membershipId,
      amount: createMembershipPaymentDto.amount,
      paymentDate: createMembershipPaymentDto.paymentDate,
      paymentMethod: createMembershipPaymentDto.paymentMethod,
    });
  }
}
