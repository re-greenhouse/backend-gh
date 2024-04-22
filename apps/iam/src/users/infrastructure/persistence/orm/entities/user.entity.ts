import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: string;
}
