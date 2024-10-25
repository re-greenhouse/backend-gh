import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipStatus } from '../enums/membership.status.enum';
import { MembershipPaymentEntity } from './membership-payment.entity';

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
  status: string;

  @Column()
  companyId: string;

  @OneToOne(
    () => MembershipPaymentEntity,
    (membershipPayment) => membershipPayment.membership,
  )
  membershipPayment: MembershipPaymentEntity;
}
