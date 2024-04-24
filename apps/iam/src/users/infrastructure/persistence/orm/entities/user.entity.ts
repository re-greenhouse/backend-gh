import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    unique: true,
    transformer: {
      to: (value: string) => value.toLowerCase(),
      from: (value: string) => value.toLowerCase(),
    },
  })
  username: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: string;
}
