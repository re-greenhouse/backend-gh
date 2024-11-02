import { CreateMembershipPaymentRepository } from '../../../../application/ports/create-membership-payment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipPaymentEntity } from '../entities/membership-payment.entity';
import { Repository } from 'typeorm';
import { MembershipPayment } from '../../../../domain/membershipPayment';
import { Injectable } from '@nestjs/common';
import { MembershipPaymentMapper } from '../mapper/membership-payment.mapper';

@Injectable()
export class OrmCreateMembershipPaymentRepository
  implements CreateMembershipPaymentRepository
{
  constructor(
    @InjectRepository(MembershipPaymentEntity)
    private readonly membershipPaymentRepository: Repository<MembershipPayment>,
  ) {}

  async save(membershipPayment: MembershipPayment): Promise<MembershipPayment> {
    const persistenceModel: MembershipPaymentEntity =
      MembershipPaymentMapper.toPersistence(membershipPayment);
    const newEntity: MembershipPaymentEntity =
      await this.membershipPaymentRepository.save(persistenceModel);
    return MembershipPaymentMapper.toDomain(newEntity);
  }
}
