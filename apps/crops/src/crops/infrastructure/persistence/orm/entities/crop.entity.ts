import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RecordEntity } from './record.entity';

@Entity('crops')
export class CropEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: string;

  @Column()
  createdBy: string;

  @OneToMany(() => RecordEntity, (record) => record.crop)
  records: Array<RecordEntity>;
}
