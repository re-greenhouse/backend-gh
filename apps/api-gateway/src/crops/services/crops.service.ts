import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CROPS_SERVICE_NAME,
  CropsServiceClient,
} from '@app/common/types/crops';
import { CROPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { UpdateCropImageDto } from '../dto/update-crop-image.dto';

@Injectable()
export class CropsService implements OnModuleInit {
  private cropsService: CropsServiceClient;

  constructor(@Inject(CROPS_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.cropsService =
      this.client.getService<CropsServiceClient>(CROPS_SERVICE_NAME);
  }

  create(createCropDto: CreateCropDto) {
    return this.cropsService.createCrop({
      name: createCropDto.name,
      author: createCropDto.author,
      companyId: createCropDto.companyId,
    });
  }

  findOne(id: string) {
    return this.cropsService.findOneCrop({ id: id });
  }

  findAll() {
    return this.cropsService.findAll({});
  }

  findAllByState(state: boolean) {
    return this.cropsService.findAllByState({ state: state });
  }

  findByCompanyId(companyId: string) {
    return this.cropsService.findByCompanyId({ companyId: companyId });
  }

  update(id: string, updateCropDto: UpdateCropDto) {
    return this.cropsService.updateCrop({
      id: id,
      phase: updateCropDto.phase,
      state: updateCropDto.state,
    });
  }

  updateImage(id: string, updateCropImageDto: UpdateCropImageDto) {
    return this.cropsService.updateCropImage({
      id: id,
      imageUrl: updateCropImageDto.imageUrl,
      quality: updateCropImageDto.quality,
    });
  }

  remove(id: string) {
    return this.cropsService.removeCrop({ id: id });
  }
}
