import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { RecordEntity } from './record.entity';
import { CropPhase } from '../enums/phase.enum';

@Entity('crops')
export class CropEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  startDate: string;

  @Column({ enum: CropPhase, default: CropPhase.Stock })
  phase: string;

  @Column()
  author: string;

  @Column()
  state: boolean;

  @OneToMany(() => RecordEntity, (record) => record.crop)
  records: Array<RecordEntity>;
}
