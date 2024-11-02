import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { MembershipPaymentsService } from '../services/membership-payments.service';
import { CreateMembershipPaymentDto } from '../dto/create-membership-payment.dto';

@ApiBearerAuth()
@ApiTags('Membership Payments')
@Controller('api/v1/membership_payments')
export class MembershipPaymentsController {
  constructor(
    private readonly membershipPaymentsService: MembershipPaymentsService,
  ) {}

  @Post()
  create(@Body() createMembershipPaymentDto: CreateMembershipPaymentDto) {
    return this.membershipPaymentsService.create(createMembershipPaymentDto);
  }
}
