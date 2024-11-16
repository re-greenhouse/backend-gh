import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('membership-payments')
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
