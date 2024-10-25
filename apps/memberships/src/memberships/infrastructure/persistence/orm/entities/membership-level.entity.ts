import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { MembershipEntity } from './membership.entity';
import { BenefitEntity } from './benefit.entity';

@Entity('membership-levels')
export class MembershipLevelEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => BenefitEntity, (benefit) => benefit.membershipLevel)
  benefits: Array<BenefitEntity>;

  // No sé cómo hacer esta relación, si alguien sabe, que opine
  @ManyToOne(() => MembershipEntity, (membership) => membership.membershipLevel)
  membership: MembershipEntity;
}
