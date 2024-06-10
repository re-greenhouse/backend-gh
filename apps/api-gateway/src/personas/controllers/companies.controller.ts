import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserFacadeService } from '../../iam/facades/user-facade.service';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('api/v1/companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly userFacadeService: UserFacadeService,
  ) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    const userId = await this.userFacadeService.getIdByUsername(
      req['user']['sub'],
    );
    return this.companiesService.create(userId, createCompanyDto);
  }

  /*
    TODO: Take care that person B can't access person A data
     if person B is not the owner and doesn't have admin roles.
  */
  @Get()
  findByProfile(@Query('profileId') profileId: string) {
    return this.companiesService.findByProfileId(profileId);
  }
}
