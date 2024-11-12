import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { RecordEntity } from './record.entity';
import { CropPhase } from '../enums/phase.enum';
import { CropQuality } from '../enums/quality.enum';

@Entity('crops')
export class CropEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  startDate: string;

  @Column({ enum: CropPhase, default: CropPhase.Formula })
  phase: string;

  @Column()
  author: string;

  @Column()
  state: boolean;

  @Column()
  imageUrl: string;

  @Column({ enum: CropQuality })
  quality: string;
  
  @Column()
  companyId: string;

  @OneToMany(() => RecordEntity, (record) => record.crop)
  records: Array<RecordEntity>;
}
