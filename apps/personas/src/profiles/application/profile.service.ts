import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/create-profile.command';
import { Profile } from '../domain/profile';
import { GetProfileByUserIdQuery } from './queries/get-profile-by-user-id.query';

@Injectable()
export class ProfileService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createProfileCommand: CreateProfileCommand) {
    return this.commandBus.execute(createProfileCommand);
  }

  findByUserId(id: string): Promise<Profile> {
    return this.queryBus.execute(new GetProfileByUserIdQuery(id));
  }
}
