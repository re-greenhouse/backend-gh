import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/create-profile.command';
import { GetProfileByUserIdQuery } from './queries/get-profile-by-user-id.query';
import { GetProfilesByCompanyIdQuery } from './queries/get-profiles-by-company-id.query';
import { UpdateProfileCommand } from './commands/update-profile.command';

@Injectable()
export class ProfileService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createProfileCommand: CreateProfileCommand) {
    return this.commandBus.execute(createProfileCommand);
  }

  updateProfileById(updateProfileCommand: UpdateProfileCommand) {
    return this.commandBus.execute(updateProfileCommand);
  }

  findByUserId(id: string) {
    return this.queryBus.execute(new GetProfileByUserIdQuery(id));
  }

  findByCompanyId(id: string) {
    return this.queryBus.execute(new GetProfilesByCompanyIdQuery(id));
  }
}
