import { Injectable } from '@nestjs/common';
import { CreateProfileRepository } from '../../../../application/ports/create-profile.repository';
import { Profile } from '../../../../domain/profile';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { ProfileMapper } from '../mapper/profile.mapper';

@Injectable()
export class OrmCreateProfileRepository implements CreateProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async save(profile: Profile): Promise<Profile> {
    const persistenceModel: ProfileEntity =
      ProfileMapper.toPersistence(profile);

    const newEntity: ProfileEntity =
      await this.profileRepository.save(persistenceModel);
    return ProfileMapper.toDomain(newEntity);
  }
}
