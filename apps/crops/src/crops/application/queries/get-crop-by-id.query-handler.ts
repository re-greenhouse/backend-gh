import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCropByIdQuery } from './get-crop-by-id.query';
import { Crop } from '../../domain/crop';
import { FindCropsRepository } from '../ports/find-crops.repository';

@QueryHandler(GetCropByIdQuery)
export class GetCropByIdQueryHandler
  implements IQueryHandler<GetCropByIdQuery, Crop | undefined>
{
  constructor(private readonly findCropsRepository: FindCropsRepository) {}

  async execute(query: GetCropByIdQuery): Promise<Crop> {
    return await this.findCropsRepository.findById(query.id);
  }
}
