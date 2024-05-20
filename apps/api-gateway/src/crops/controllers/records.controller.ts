import { RecordsService } from '../services/records.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { CreateRecordDto } from '../dto/create-record.dto';

@ApiBearerAuth()
@ApiTags('Records')
@Controller('api/v1/records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  create(@Req() req: Request, @Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(req['user']['sub'], createRecordDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.recordsService.findAll(req['user']['sub']);
  }

  @Get(':cropId/:phase')
  findAllByCropAndPhase(
    @Req() req: Request,
    @Param('cropId') cropId: string,
    @Param('phase') phase: string,
  ) {
    return this.recordsService.findAllByCropAndPhase(
      req['user']['sub'],
      cropId,
      phase,
    );
  }
}
