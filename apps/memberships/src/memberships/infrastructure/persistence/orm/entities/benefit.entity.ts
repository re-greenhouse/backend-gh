import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { MembershipLevelEntity } from './membership-level.entity';

@Entity('benefits')
export class BenefitEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(
    () => MembershipLevelEntity,
    (membershipLevel) => membershipLevel.benefits,
  )
  membershipLevel: MembershipLevelEntity;
}
