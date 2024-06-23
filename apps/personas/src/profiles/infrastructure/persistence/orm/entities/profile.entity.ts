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
    default: [Role.Technician],
  })
  role: Role;

  @ManyToOne(() => CompanyEntity, (company) => company.employees, {
    nullable: true,
    eager: true,
  })
  company: CompanyEntity | null;
}
