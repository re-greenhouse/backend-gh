import {
  CreateCropDto,
  Crop,
  CropResponse,
  CropsServiceController,
  CropsServiceControllerMethods,
  FindAllCropsByStateDto,
  FindAllCropsDto,
} from '@app/common/types/crops';
import { Controller } from '@nestjs/common';
import { CropsService } from '../../application/crops.service';
import { CreateCropCommand } from '../../application/commands/create-crop.command';

@Controller()
@CropsServiceControllerMethods()
export class CropsController implements CropsServiceController {
  constructor(private readonly cropsService: CropsService) {}

  async createCrop(request: CreateCropDto): Promise<Crop> {
    return this.cropsService.create(
      new CreateCropCommand(request.name, request.author),
    );
  }
  async findAll(request: FindAllCropsDto): Promise<CropResponse> {
    return this.cropsService.findAll();
  }
  async findAllByState(request: FindAllCropsByStateDto): Promise<CropResponse> {
    return this.cropsService.findByState(request.state);
  }
}
