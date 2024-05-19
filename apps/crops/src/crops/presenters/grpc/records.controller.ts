import {
  CreateRecordDto,
  CropRecord,
  CropRecordResponse,
  FindAllRecordsByCropAndPhase,
  FindAllRecordsDto,
  RecordsServiceController,
  RecordsServiceControllerMethods,
} from '@app/common/types/crops';
import { Controller } from '@nestjs/common';
import { RecordService } from '../../application/records.service';
import { Observable } from 'rxjs';
import { CreateRecordCommand } from '../../application/commands/create-record.command';
import { CropsService } from '../../application/crops.service';
import { Crop } from '../../domain/crop';

@Controller()
@RecordsServiceControllerMethods()
export class RecordsController implements RecordsServiceController {
  constructor(
    private readonly recordService: RecordService,
    private readonly cropService: CropsService,
  ) {}

  async createRecord(request: CreateRecordDto): Promise<CropRecord> {
    const requestCrop: Crop = await this.cropService.findById(request.cropId);
    return this.recordService.create(
      new CreateRecordCommand(
        request.author,
        request.phase,
        request.payload,
        requestCrop,
      ),
    );
  }

  async findAll(request: FindAllRecordsDto): Promise<CropRecordResponse> {
    return this.recordService.findAll();
  }

  async findAllByCropAndPhase(
    request: FindAllRecordsByCropAndPhase,
  ): Promise<CropRecordResponse> {
    return this.recordService.findAllByCropAndPhase(
      request.crop,
      request.phase,
    );
  }
}
