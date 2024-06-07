import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCropByIdQuery } from './get-crop-by-id.query';
import { Crop } from '../../domain/crop';
import { FindCropsRepository } from '../ports/find-crops.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetCropByIdQuery)
export class GetCropByIdQueryHandler
  implements IQueryHandler<GetCropByIdQuery, Crop | undefined>
{
  constructor(private readonly findCropsRepository: FindCropsRepository) {}

  async execute(query: GetCropByIdQuery): Promise<Crop> {
    const crop = await this.findCropsRepository.findById(query.id);
    if (crop === undefined) {
      throw new GrpcNotFoundException(`Crop ${query.id} doesn't exists. `);
    }
    return crop;
  }
}
