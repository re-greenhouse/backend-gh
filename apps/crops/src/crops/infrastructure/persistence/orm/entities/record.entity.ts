import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { CropEntity } from './crop.entity';

@Entity('records')
export class RecordEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  author: string;

  @Column()
  phase: string;

  @Column({ type: 'json' })
  payload: Record<string, string>;

  @ManyToOne(() => CropEntity, (crop) => crop.records)
  crop: CropEntity;
}
