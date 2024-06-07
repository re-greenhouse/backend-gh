import { RecordsService } from '../services/records.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateRecordDto } from '../dto/create-record.dto';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('Records')
@Controller('api/v1/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    Logger.log(`APIGATEWAY>> ${JSON.stringify(createRecordDto.payload)}`);
    createRecordDto.payload = JSON.stringify(createRecordDto.payload);
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  async findAll() {
    const res = await firstValueFrom(this.recordsService.findAll());
    Logger.log(res);
    res.records.forEach(
      (records) => (records.payload = JSON.parse(records.payload)),
    );
    return res;
  }

  @Get(':cropId/:phase')
  findAllByCropAndPhase(
    @Param('cropId') cropId: string,
    @Param('phase') phase: string,
  ) {
    return this.recordsService.findAllByCropAndPhase(cropId, phase);
  }
}
