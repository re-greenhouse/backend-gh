import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { TemplateService } from '../services/template.service';
import { TemplateDto } from '../dtos/template.dto';
import { UpdateTemplateDto } from '@app/common/types/mailing';

@ApiBearerAuth()
@ApiTags('Mail')
@Controller('api/v1/templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create a email template',
    type: TemplateDto,
  })
  async create(@Body() createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all email templates',
    type: Array<TemplateDto>,
  })
  async getAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve an email template by id',
    type: TemplateDto,
  })
  async getById(@Param('id') id: string) {
    return this.templateService.findById(id);
  }

  @Get('event-name/:name')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve an email template by name',
    type: TemplateDto,
  })
  async getByEventName(@Param('name') name: string) {
    return this.templateService.findByEventName(name);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete an email template',
    type: TemplateDto,
  })
  async delete(@Param('id') id: string) {
    return this.templateService.remove(id);
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update an email template',
    type: TemplateDto,
  })
  async update(@Param('id') id: string, updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update(id, updateTemplateDto);
  }
}
