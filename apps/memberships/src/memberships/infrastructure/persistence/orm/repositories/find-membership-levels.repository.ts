import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindMembershipLevelsRepository } from '../../../../application/ports/find-membership-levels.repository';
import { MembershipLevel } from '../../../../domain/membershipLevel';
import { MembershipLevelEntity } from '../entities/membership-level.entity';
import { MembershipLevelMapper } from '../mapper/membership-level.mapper';

export class OrmFindMembershipLevelsRepository
  implements FindMembershipLevelsRepository
{
  constructor(
    @InjectRepository(MembershipLevelEntity)
    private readonly membershipLevelRepository: Repository<MembershipLevelEntity>,
  ) {}

  async findByName(name: string): Promise<MembershipLevel | undefined> {
    const membershipLevelEntity: MembershipLevelEntity | null =
      await this.membershipLevelRepository.findOneBy({
        name: name,
      });
    return membershipLevelEntity
      ? MembershipLevelMapper.toDomain(membershipLevelEntity)
      : undefined;
  }
}
