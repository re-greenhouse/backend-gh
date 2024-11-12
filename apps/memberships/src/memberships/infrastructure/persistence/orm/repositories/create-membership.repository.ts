import { CreateMembershipRepository } from '../../../../application/ports/create-membership.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipEntity } from '../entities/membership.entity';
import { Repository } from 'typeorm';
import { Membership } from '../../../../domain/membership';
import { MembershipMapper } from '../mapper/membership.mapper';

@Injectable()
export class OrmCreateMembershipRepository
  implements CreateMembershipRepository
{
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
  ) {}

  async save(membership: Membership): Promise<Membership> {
    const persistenceModel: MembershipEntity =
      MembershipMapper.toPersistence(membership);
    const newEntity: MembershipEntity =
      await this.membershipRepository.save(persistenceModel);
    return MembershipMapper.toDomain(newEntity);
  }
}
