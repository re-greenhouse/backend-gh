import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecordsByCropAndPhaseQuery } from './get-records-by-crop-and-phase.query';
import { CropRecord } from '../../domain/record';
import { FindRecordsRepository } from '../ports/find-records.repository';
import { FindCropsRepository } from '../ports/find-crops.repository';

@QueryHandler(GetRecordsByCropAndPhaseQuery)
export class GetRecordsByCropAndPhaseQueryHandler
  implements
    IQueryHandler<GetRecordsByCropAndPhaseQuery, Array<CropRecord> | undefined>
{
  constructor(
    private readonly findRecordsRepository: FindRecordsRepository,
    private readonly findCropRepository: FindCropsRepository,
  ) {}

  async execute(
    query: GetRecordsByCropAndPhaseQuery,
  ): Promise<Array<CropRecord>> {
    const crop = await this.findCropRepository.findById(query.cropId);
    return await this.findRecordsRepository.findByCropAndPhase(
      crop,
      query.phase,
    );
  }
}
