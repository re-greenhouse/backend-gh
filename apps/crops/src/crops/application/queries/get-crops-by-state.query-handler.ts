import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCropsByStateQuery } from './get-crops-by-state.query';
import { Crop } from '../../domain/crop';
import { FindCropsRepository } from '../ports/find-crops.repository';

@QueryHandler(GetCropsByStateQuery)
export class GetCropsByStateQueryHandler
  implements IQueryHandler<GetCropsByStateQuery, Array<Crop> | undefined>
{
  constructor(private readonly findCropsRepository: FindCropsRepository) {}

  async execute(query: GetCropsByStateQuery): Promise<Array<Crop>> {
    return await this.findCropsRepository.findAllByState(query.state);
  }
}
