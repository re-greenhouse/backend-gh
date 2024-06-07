import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CropEntity } from './crop.entity';

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

  @Column()
  phase: string;

  @Column({ type: 'json' })
  payload: string;

  @ManyToOne(() => CropEntity, (crop) => crop.records)
  crop: CropEntity;
}
