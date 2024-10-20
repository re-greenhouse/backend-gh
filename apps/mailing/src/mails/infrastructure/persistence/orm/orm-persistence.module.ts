import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateEntity } from './entities/email-template.entity';
import { OrmFindTemplateRepository } from './repositories/find-template.repository';
import { FindTemplateRepository } from '../../../application/ports/find-template.repository';
import { SaveTemplateRepository } from '../../../application/ports/save-template.repository';
import { OrmSaveTemplateRepository } from './repositories/save-template.repository';
import { DeleteTemplateRepository } from '../../../application/ports/delete-template.repository';
import { OrmDeleteTemplateRepository } from './repositories/delete-template.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateEntity])],
  providers: [
    {
      provide: FindTemplateRepository,
      useClass: OrmFindTemplateRepository,
    },
    {
      provide: SaveTemplateRepository,
      useClass: OrmSaveTemplateRepository,
    },
    {
      provide: DeleteTemplateRepository,
      useClass: OrmDeleteTemplateRepository,
    },
  ],
  exports: [
    FindTemplateRepository,
    SaveTemplateRepository,
    DeleteTemplateRepository,
  ],
})
export class OrmMailingPersistenceModule {}
