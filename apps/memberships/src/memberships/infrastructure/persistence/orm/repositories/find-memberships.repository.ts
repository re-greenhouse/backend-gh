import { FindMembershipsRepository } from '../../../../application/ports/find-memberships.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipEntity } from '../entities/membership.entity';
import { Repository } from 'typeorm';
import { Company } from '@app/common/types/personas';
import { Membership } from '../../../../domain/membership';
import { MembershipMapper } from '../mapper/membership.mapper';

export class OrmFindMembershipsRepository implements FindMembershipsRepository {
  constructor(
    @InjectRepository(MembershipEntity)
    private readonly membershipRepository: Repository<MembershipEntity>,
  ) {}

  async findAll(): Promise<Array<Membership>> {
    const membershipEntities: Array<MembershipEntity> =
      await this.membershipRepository.find();
    return membershipEntities.map(MembershipMapper.toDomain);
  }

  async findById(id: string): Promise<Membership | undefined> {
    const membershipEntity: MembershipEntity | null =
      await this.membershipRepository.findOneBy({
        id: id,
      });
    return membershipEntity
      ? MembershipMapper.toDomain(membershipEntity)
      : undefined;
  }

  async findByCompany(company: Company): Promise<Membership | undefined> {
    const membershipEntity: MembershipEntity | null =
      await this.membershipRepository.findOne({
        relations: ['company'],
        where: {
          company: { id: company.id },
        },
      });
    return membershipEntity
      ? MembershipMapper.toDomain(membershipEntity)
      : undefined;
  }
}
