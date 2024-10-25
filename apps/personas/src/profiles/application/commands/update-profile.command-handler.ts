import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { UpdateProfileCommand } from './update-profile.command';
import { FindProfilesRepository } from '../ports/find-profiles.repository';
import { Profile } from '../../domain/profile';
import { CreateProfileRepository } from '../ports/create-profile.repository';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileCommandHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(
    private readonly findProfileRepository: FindProfilesRepository,
    private readonly createProfileRepository: CreateProfileRepository,
  ) {}

  async execute(command: UpdateProfileCommand): Promise<Profile> {
    const profile = await this.findProfileRepository.findById(command.id);

    if (!profile) {
      throw new GrpcNotFoundException(
        `There's no profile with id '${command.id}'`,
      );
    }

    profile.firstName ??= command.firstName;
    profile.lastName ??= command.lastName;
    profile.iconUrl ??= command.iconUrl;

    return this.createProfileRepository.save(profile);
  }
}
