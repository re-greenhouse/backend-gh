import {
  CreateCropDto,
  Crop,
  CropResponse,
  CropsServiceController,
  CropsServiceControllerMethods,
  FindAllCropsByStateDto,
  FindAllCropsDto,
  FindOneCropDto,
  UpdateCropDto,
} from '@app/common/types/crops';
import { Controller } from '@nestjs/common';
import { CropsService } from '../../application/crops.service';
import { CreateCropCommand } from '../../application/commands/create-crop.command';
import { UpdateCropCommand } from '../../application/commands/update-crop.command';
import { DeleteCropCommand } from '../../application/commands/delete-crop.command';

@Controller()
@CropsServiceControllerMethods()
export class CropsController implements CropsServiceController {
  constructor(private readonly cropsService: CropsService) {}

  async createCrop(request: CreateCropDto): Promise<Crop> {
    return this.cropsService.create(
      new CreateCropCommand(request.name, request.author),
    );
  }
  async findAll({}: FindAllCropsDto): Promise<CropResponse> {
    return { crops: await this.cropsService.findAll() };
  }
  async findAllByState(request: FindAllCropsByStateDto): Promise<CropResponse> {
    return { crops: await this.cropsService.findByState(request.state) };
  }

  findOneCrop(findOneCropDto: FindOneCropDto): Promise<Crop> {
    return this.cropsService.findById(findOneCropDto.id);
  }

  updateCrop(updateCropDto: UpdateCropDto): Promise<Crop> {
    return this.cropsService.update(
      new UpdateCropCommand(
        updateCropDto.id,
        updateCropDto.phase,
        updateCropDto.state,
      ),
    );
  }

  removeCrop(findOneCropDto: FindOneCropDto): Promise<Crop> {
    return this.cropsService.remove(new DeleteCropCommand(findOneCropDto.id));
  }
}
