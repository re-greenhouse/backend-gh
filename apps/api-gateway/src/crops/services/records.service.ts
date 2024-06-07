import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  RECORDS_SERVICE_NAME,
  RecordsServiceClient,
} from '@app/common/types/crops';
import { CROPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateRecordDto } from '../dto/create-record.dto';
import { UpdateRecordDto } from '../dto/update-record.dto';

@Injectable()
export class RecordsService implements OnModuleInit {
  private recordsService: RecordsServiceClient;

  constructor(@Inject(CROPS_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.recordsService =
      this.client.getService<RecordsServiceClient>(RECORDS_SERVICE_NAME);
  }

  create(createRecordDto: CreateRecordDto) {
    createRecordDto.payload = JSON.stringify(createRecordDto.payload);
    return this.recordsService.createRecord(createRecordDto);
  }

  findOne(id: string) {
    return this.recordsService.findOneRecord({ id: id });
  }

  findAll() {
    return this.recordsService.findAll({});
  }

  findAllByCropAndPhase(cropId: string, phase: string) {
    return this.recordsService.findAllByCropAndPhase({
      cropId: cropId,
      phase: phase,
    });
  }

  update(id: string, updateRecordDto: UpdateRecordDto) {
    return this.recordsService.updateRecord({
      id: id,
      payload: updateRecordDto.payload,
    });
  }

  remove(id: string) {
    return this.recordsService.removeRecord({ id: id });
  }
}
