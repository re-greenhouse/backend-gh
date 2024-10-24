import { Controller } from '@nestjs/common';
import {
  CreateProfileDto,
  FindAllByCompanyIdDto,
  FindOneProfileByUserIdDto,
  Profile,
  Profiles,
  ProfilesServiceController,
  ProfilesServiceControllerMethods,
  UpdateProfileDto,
} from '@app/common/types/personas';
import { ProfileService } from '../../application/profile.service';
import { CreateProfileCommand } from '../../application/commands/create-profile.command';
import { UpdateProfileCommand } from '../../application/commands/update-profile.command';

@Controller()
@ProfilesServiceControllerMethods()
export class ProfilesController implements ProfilesServiceController {
  constructor(private readonly profileService: ProfileService) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(
      new CreateProfileCommand(
        createProfileDto.firstName,
        createProfileDto.lastName,
        createProfileDto.iconUrl,
        createProfileDto.userId,
      ),
    );
  }

  async findByUserId(
    findOneUserByIdDto: FindOneProfileByUserIdDto,
  ): Promise<Profile> {
    return this.profileService.findByUserId(findOneUserByIdDto.userId);
  }

  async findByCompanyId(
    findAllByCompanyIdDto: FindAllByCompanyIdDto,
  ): Promise<Profiles> {
    return {
      profiles: await this.profileService.findByCompanyId(
        findAllByCompanyIdDto.companyId,
      ),
    };
  }

  async updateProfileById(request: UpdateProfileDto): Promise<Profile> {
    return this.profileService.updateProfileById(
      new UpdateProfileCommand(
        request.profileId,
        request.firstName,
        request.lastName,
        request.iconUrl,
      ),
    );
  }
}
