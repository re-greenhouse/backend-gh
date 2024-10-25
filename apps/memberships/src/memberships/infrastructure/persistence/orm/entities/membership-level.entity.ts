import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('membership-levels')
export class MembershipLevelEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;
}
