import { SaveMembershipRepository } from '../../../../application/ports/save-membership.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipEntity } from '../entities/membership.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Membership } from '../../../../domain/membership';
import { MembershipMapper } from '../mapper/membership.mapper';

@Injectable()
export class OrmSaveMembershipRepository implements SaveMembershipRepository {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
  ) {}

  async save(membership: Membership): Promise<Membership> {
    const membershipEntity = MembershipMapper.toPersistence(membership);
    const newMembership =
      await this.membershipRepository.save(membershipEntity);
    return MembershipMapper.toDomain(newMembership);
  }
}
