import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CROPS_SERVICE_NAME,
  CropsServiceClient,
} from '@app/common/types/crops';
import { CROPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';

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

  update(id: string, updateCropDto: UpdateCropDto) {
    return this.cropsService.updateCrop({
      id: id,
      phase: updateCropDto.phase,
      state: updateCropDto.state,
    });
  }

  remove(id: string) {
    return this.cropsService.removeCrop({ id: id });
  }
}
