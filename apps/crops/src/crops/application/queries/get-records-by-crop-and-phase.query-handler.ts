import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecordsByCropAndPhaseQuery } from './get-records-by-crop-and-phase.query';
import { CropRecord } from '../../domain/record';
import { FindRecordsRepository } from '../ports/find-records.repository';

@QueryHandler(GetRecordsByCropAndPhaseQuery)
export class GetRecordsByCropAndPhaseQueryHandler
  implements
    IQueryHandler<GetRecordsByCropAndPhaseQuery, Array<CropRecord> | undefined>
{
  constructor(private readonly findRecordsRepository: FindRecordsRepository) {}

  async execute(
    query: GetRecordsByCropAndPhaseQuery,
  ): Promise<Array<CropRecord>> {
    return await this.findRecordsRepository.findByCropAndPhase(
      query.crop,
      query.phase,
    );
  }
}
