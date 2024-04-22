import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CompanyEntity } from './company.entity';
import { Role } from '../enums/role.enum';

@Entity('profiles')
export class ProfileEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  iconUrl: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.Technician],
  })
  roles: Array<Role>;

  @ManyToOne(() => CompanyEntity, (company) => company.employees, {
    nullable: true,
  })
  company: CompanyEntity | null;
}
