import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProfileCommand } from './create-profile.command';
import { CreateProfileRepository } from '../ports/create-profile.repository';
import { Profile } from '../../domain/profile';
import { ProfileFactory } from '../../domain/factories/profile.factory';
import { FindProfilesRepository } from '../ports/find-profiles.repository';
import { GrpcAlreadyExistsException } from 'nestjs-grpc-exceptions';

@CommandHandler(CreateProfileCommand)
export class CreateProfileCommandHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(
    private readonly profileFactory: ProfileFactory,
    private readonly createProfileRepository: CreateProfileRepository,
    private readonly findProfilesRepository: FindProfilesRepository,
  ) {}

  async execute(command: CreateProfileCommand): Promise<Profile> {
    if (await this.findProfilesRepository.existByUserId(command.userId)) {
      throw new GrpcAlreadyExistsException(
        `There's an existing profile for user with id: ${command.userId}`,
      );
    }

    const profile: Profile = this.profileFactory.create(
      command.userId,
      command.firstName,
      command.lastName,
      command.iconUrl,
    );

    return await this.createProfileRepository.save(profile);
  }
}
