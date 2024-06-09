import { RecordsService } from '../services/records.service';
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
import { CreateRecordDto } from '../dto/create-record.dto';
import { firstValueFrom } from 'rxjs';
import { UpdateRecordDto } from '../dto/update-record.dto';

@ApiBearerAuth()
@ApiTags('Records')
@Controller('api/v1/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  async findAll() {
    const res = await firstValueFrom(this.recordsService.findAll());
    if (res.records !== undefined) {
      res.records.forEach(
        (records) => (records.payload = JSON.parse(records.payload)),
      );
    }
    return res;
  }

  @Get(':cropId/:phase')
  findAllByCropAndPhase(
    @Param('cropId') cropId: string,
    @Param('phase') phase: string,
  ) {
    return this.recordsService.findAllByCropAndPhase(cropId, phase);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}
