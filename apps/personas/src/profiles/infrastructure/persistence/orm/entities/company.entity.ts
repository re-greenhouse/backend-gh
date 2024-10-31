import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProfileEntity } from './profile.entity';

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

  @OneToMany(() => ProfileEntity, (profile) => profile.company)
  employees: Array<ProfileEntity>;
}
