import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PERSONAS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateProfileDto,
  PROFILES_SERVICE_NAME,
  ProfilesServiceClient,
} from '@app/common/types/personas';

@Injectable()
export class ProfileFacadeService implements OnModuleInit {
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
}
