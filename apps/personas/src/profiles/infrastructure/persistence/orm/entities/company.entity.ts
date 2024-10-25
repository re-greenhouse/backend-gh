import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { MembershipEntity } from '../../../../../../../memberships/src/memberships/infrastructure/persistence/orm/entities/membership.entity';
import { Membership } from '../../../../../../../memberships/src/memberships/domain/membership';

@Entity('companies')
export class CompanyEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  tin: string;

  @Column()
  logoUrl: string;

  @OneToOne(() => MembershipEntity, (membership) => membership.company)
  membership: Membership;

  @OneToMany(() => ProfileEntity, (profile) => profile.company)
  employees: Array<ProfileEntity>;
}
