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
  create(@Req() req: Request, @Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(req['user']['sub'], createCropDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.cropsService.findAll(req['user']['sub']);
  }

  @Get(':state')
  findAllByState(@Req() req: Request, @Param('state') state: boolean) {
    return this.cropsService.findAllByState(req['user']['sub'], state);
  }
}
