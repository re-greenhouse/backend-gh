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
  async findAllByCropAndPhase(
    @Param('cropId') cropId: string,
    @Param('phase') phase: string,
  ) {
    const res = await firstValueFrom(
      this.recordsService.findAllByCropAndPhase(cropId, phase),
    );
    if (res.records !== undefined) {
      res.records.forEach(
        (records) => (records.payload = JSON.parse(records.payload)),
      );
    }
    return res;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await firstValueFrom(this.recordsService.findOne(id));
    if (res !== undefined) {
      res.payload = JSON.parse(res.payload);
    }
    return res;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    updateRecordDto.payload = updateRecordDto.payload.toString();
    const res = await firstValueFrom(
      this.recordsService.update(id, updateRecordDto),
    );
    if (res !== undefined) {
      res.payload = JSON.parse(res.payload);
    }
    return res;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await firstValueFrom(this.recordsService.remove(id));
    if (res !== undefined) {
      res.payload = JSON.parse(res.payload);
    }
    return res;
  }
}
