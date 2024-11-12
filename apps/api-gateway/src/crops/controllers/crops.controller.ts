import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CropsService } from '../services/crops.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { UpdateCropImageDto } from '../dto/update-crop-image.dto';

@ApiBearerAuth()
@ApiTags('Crops')
@Controller('api/v1/crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Post()
  create(@Body() createCropDto: CreateCropDto) {
    return this.cropsService.create(createCropDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.cropsService.findAll();
  }

  @Get(':state')
  findAllByState(@Param('state') state: boolean) {
    return this.cropsService.findAllByState(state);
  }

  @Get('/company/:companyId')
  findByCompanyId(@Param('companyId') companyId: string) {
    return this.cropsService.findByCompanyId(companyId);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() updateCropDto: UpdateCropDto) {
    return this.cropsService.update(id, updateCropDto);
  }

  @Patch('/image/:id')
  updateImage(
    @Param('id') id: string,
    @Body() updateCropImageDto: UpdateCropImageDto,
  ) {
    return this.cropsService.updateImage(id, updateCropImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsService.remove(id);
  }
}
