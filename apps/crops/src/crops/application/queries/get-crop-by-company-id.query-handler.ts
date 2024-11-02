import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCropByCompanyIdQuery } from './get-crop-by-company-id.query';
import { Crop } from '../../domain/crop';
import { FindCropsRepository } from '../ports/find-crops.repository';

@QueryHandler(GetCropByCompanyIdQuery)
export class GetCropByCompanyIdQueryHandler
  implements IQueryHandler<GetCropByCompanyIdQuery, Array<Crop> | undefined>
{
  constructor(private readonly findCropsRepository: FindCropsRepository) {}

  async execute(query: GetCropByCompanyIdQuery): Promise<Array<Crop>> {
    return await this.findCropsRepository.findByCompanyId(query.companyId);
  }
}
