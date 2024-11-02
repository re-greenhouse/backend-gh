import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { BenefitEntity } from './benefit.entity';

@Entity('membership-levels')
export class MembershipLevelEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  //@OneToMany(() => BenefitEntity, (benefit) => benefit.membershipLevel)
  //benefits: Array<BenefitEntity>;
}
