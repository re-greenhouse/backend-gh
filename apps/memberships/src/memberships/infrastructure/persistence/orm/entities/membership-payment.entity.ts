import { Column, CreateDateColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { MembershipEntity } from './membership.entity';

export class MembershipPaymentEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  paymentDate: string;

  @Column()
  paymentMethod: string;

  /*@OneToOne(
    () => MembershipEntity,
    (membership) => membership.membershipPayment,
  )*/
  @Column()
  membershipId: string;
}
