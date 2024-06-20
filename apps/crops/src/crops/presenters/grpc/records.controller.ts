import {
  CreateRecordDto,
  CropRecord,
  CropRecordResponse,
  FindAllRecordsByCropAndPhase,
  FindAllRecordsDto,
  FindOneRecordDto,
  RecordsServiceController,
  RecordsServiceControllerMethods,
  UpdateRecordDto,
} from '@app/common/types/crops';
import { Controller } from '@nestjs/common';
import { RecordsService } from '../../application/records.service';
import { CreateRecordCommand } from '../../application/commands/create-record.command';
import { CropsService } from '../../application/crops.service';
import { Crop } from '../../domain/crop';
import { UpdateRecordCommand } from '../../application/commands/update-record.command';
import { DeleteRecordCommand } from '../../application/commands/delete-record.command';

@Controller()
@RecordsServiceControllerMethods()
export class RecordsController implements RecordsServiceController {
  constructor(
    private readonly recordService: RecordsService,
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
    return { records: await this.recordService.findAll() };
  }

  async findAllByCropAndPhase(
    request: FindAllRecordsByCropAndPhase,
  ): Promise<CropRecordResponse> {
    /*const requestCrop: Crop = await this.cropService.findById(request.cropId);*/
    return {
      records: await this.recordService.findAllByCropAndPhase(
        request.cropId,
        request.phase,
      ),
    };
  }

  updateRecord(updateRecordDto: UpdateRecordDto): Promise<CropRecord> {
    return this.recordService.update(
      new UpdateRecordCommand(updateRecordDto.id, updateRecordDto.payload),
    );
  }

  removeRecord(findOneRecordDto: FindOneRecordDto): Promise<CropRecord> {
    return this.recordService.remove(
      new DeleteRecordCommand(findOneRecordDto.id),
    );
  }

  findOneRecord(findOneRecordDto: FindOneRecordDto): Promise<CropRecord> {
    return this.recordService.findById(findOneRecordDto.id);
  }
}
