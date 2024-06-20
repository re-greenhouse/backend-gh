import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CropEntity } from './crop.entity';
import { CropPhase } from '../enums/phase.enum';
import { JoinColumn } from 'typeorm';

@Entity('records')
export class RecordEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  author: string;

  @Column({ enum: CropPhase, default: CropPhase.Formula })
  phase: string;

  @Column({ type: 'json' })
  payload: string;

  @ManyToOne(() => CropEntity, (crop) => crop.records)
  @JoinColumn()
  crop: CropEntity;
}
