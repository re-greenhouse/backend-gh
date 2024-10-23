import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('email_templates')
export class EmailTemplateEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  eventName: string;

  @Column()
  subject: string;

  @Column()
  body: string;
}
