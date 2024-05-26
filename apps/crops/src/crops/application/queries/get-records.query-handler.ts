import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecordsQuery } from './get-records.query';
import { CropRecord } from '../../domain/record';
import { FindRecordsRepository } from '../ports/find-records.repository';

@QueryHandler(GetRecordsQuery)
export class GetRecordsQueryHandler
  implements IQueryHandler<GetRecordsQuery, Array<CropRecord> | undefined>
{
  constructor(private readonly findRecordsRepository: FindRecordsRepository) {}

  async execute(): Promise<Array<CropRecord>> {
    return await this.findRecordsRepository.findAll();
  }
}
