import { Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { MembershipLevelEntity } from './membership-level.entity';

export class BenefitEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  /*@ManyToOne(
    () => MembershipLevelEntity,
    (membershipLevel) => membershipLevel.benefits,
  )
  membershipLevel: MembershipLevelEntity;*/
}
