import {
  CreateRecordDto,
  CropRecord,
  CropRecordResponse,
  FindAllRecordsByCropAndPhase,
  FindAllRecordsDto,
  RecordsServiceController,
  RecordsServiceControllerMethods,
} from '@app/common/types/crops';
import { Controller, Logger } from '@nestjs/common';
import { RecordsService } from '../../application/records.service';
import { CreateRecordCommand } from '../../application/commands/create-record.command';
import { CropsService } from '../../application/crops.service';
import { Crop } from '../../domain/crop';

@Controller()
@RecordsServiceControllerMethods()
export class RecordsController implements RecordsServiceController {
  constructor(
    private readonly recordService: RecordsService,
    private readonly cropService: CropsService,
  ) {}

  async createRecord(request: CreateRecordDto): Promise<CropRecord> {
    Logger.log(`>>>>>>>>>>${JSON.stringify(request.payload)}`);
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
    return { records: await this.recordService.findAll() };
  }

  async findAllByCropAndPhase(
    request: FindAllRecordsByCropAndPhase,
  ): Promise<CropRecordResponse> {
    const requestCrop: Crop = await this.cropService.findById(request.cropId);
    return {
      records: await this.recordService.findAllByCropAndPhase(
        requestCrop,
        request.phase,
      ),
    };
  }
}
