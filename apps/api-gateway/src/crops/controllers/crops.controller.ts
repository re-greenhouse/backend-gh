import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CropsService } from '../services/crops.service';
import { CreateCropDto } from '../dto/create-crop.dto';

@ApiBearerAuth()
@ApiTags('Crops')
@Controller('api/v1/crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':state')
  findAllByState(@Param('state') state: boolean) {
    return this.cropsService.findAllByState(state);
  }
}
