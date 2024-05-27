import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { RecordEntity } from './record.entity';

@Entity('crops')
export class CropEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @Column()
  author: string;

  @Column()
  state: boolean;

  @OneToMany(() => RecordEntity, (record) => record.crop)
  records: Array<RecordEntity>;
}
