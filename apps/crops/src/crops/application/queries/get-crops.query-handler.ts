import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Crop } from '../../domain/crop';
import { FindCropsRepository } from '../ports/find-crops.repository';
import { GetCropsQuery } from './get-crops.query';

@QueryHandler(GetCropsQuery)
export class GetCropsQueryHandler
  implements IQueryHandler<GetCropsQuery, Array<Crop> | undefined>
{
  constructor(private readonly findCropsRepository: FindCropsRepository) {}

  async execute(): Promise<Array<Crop>> {
    return await this.findCropsRepository.findAll();
  }
}
