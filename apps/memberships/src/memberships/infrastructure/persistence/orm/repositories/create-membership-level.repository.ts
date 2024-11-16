import { CreateMembershipLevelRepository } from '../../../../application/ports/create-membership-level.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipLevelEntity } from '../entities/membership-level.entity';
import { Repository } from 'typeorm';
import { MembershipLevel } from '../../../../domain/membershipLevel';
import { MembershipLevelMapper } from '../mapper/membership-level.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmCreateMembershipLevelRepository
  implements CreateMembershipLevelRepository
{
  constructor(
    @InjectRepository(MembershipLevelEntity)
    private readonly membershipLevelRepository: Repository<MembershipLevelEntity>,
  ) {}

  async save(membershipLevel: MembershipLevel): Promise<MembershipLevel> {
    const persistenceModel: MembershipLevelEntity =
      MembershipLevelMapper.toPersistence(membershipLevel);
    const newEntity: MembershipLevelEntity =
      await this.membershipLevelRepository.save(persistenceModel);
    return MembershipLevelMapper.toDomain(newEntity);
  }
}
