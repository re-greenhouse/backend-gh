import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipStatus } from '../enums/membership.status.enum';
import { MembershipPaymentEntity } from './membership-payment.entity';
import { MembershipLevelEntity } from './membership-level.entity';
import { Company } from '@app/common/types/personas';
import { CompanyEntity } from '../../../../../../../personas/src/profiles/infrastructure/persistence/orm/entities/company.entity';

@Entity('memberships')
export class MembershipEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @Column({ enum: MembershipStatus, default: MembershipStatus.Active })
  status: MembershipStatus;

  @OneToOne(() => CompanyEntity, (company) => company.membership)
  company: Company;

  @OneToOne(
    () => MembershipPaymentEntity,
    (membershipPayment) => membershipPayment.membershipId,
  )
  membershipPayment: MembershipPaymentEntity;

  @OneToMany(
    () => MembershipLevelEntity,
    (membershipLevel) => membershipLevel.membership,
  )
  membershipLevel: MembershipLevelEntity;
}
