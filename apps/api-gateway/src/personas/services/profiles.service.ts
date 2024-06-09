import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateProfileDto,
  PROFILES_SERVICE_NAME,
  ProfilesServiceClient,
} from '@app/common/types/personas';
import { PERSONAS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class ProfilesService implements OnModuleInit {
  private profilesService: ProfilesServiceClient;

  constructor(@Inject(PERSONAS_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.profilesService = this.client.getService<ProfilesServiceClient>(
      PROFILES_SERVICE_NAME,
    );
  }

  create(createProfileDto: CreateProfileDto) {
    return this.profilesService.createProfile(createProfileDto);
  }

  findByUserId(userId: string) {
    return this.profilesService.findByUserId({ userId: userId });
  }

  async findByCompanyId(companyId: string) {
    return this.profilesService.findByCompanyId({ companyId: companyId });
  }
}
