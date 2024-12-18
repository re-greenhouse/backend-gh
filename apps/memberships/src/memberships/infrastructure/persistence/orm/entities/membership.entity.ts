import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MembershipLevelName } from '../enums/membership.level.name.enum';
import { MembershipStatus } from '../enums/membership.status.enum';

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

  @Column({ enum: MembershipLevelName })
  membershipLevelName: string;
}
