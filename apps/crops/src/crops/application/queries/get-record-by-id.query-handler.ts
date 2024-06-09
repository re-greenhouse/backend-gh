import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetRecordByIdQuery } from './get-record-by-id.query';
import { CropRecord } from '../../domain/record';
import { FindRecordsRepository } from '../ports/find-records.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetRecordByIdQuery)
export class GetRecordByIdQueryHandler
  implements IQueryHandler<GetRecordByIdQuery, CropRecord | undefined>
{
  constructor(private readonly findRecordsRepository: FindRecordsRepository) {}

  async execute(query: GetRecordByIdQuery): Promise<CropRecord> {
    const cropRecord = await this.findRecordsRepository.findById(query.id);
    if (cropRecord === undefined) {
      throw new GrpcNotFoundException(`Record ${query.id} doesn't exist. `);
    }
    return cropRecord;
  }
}
