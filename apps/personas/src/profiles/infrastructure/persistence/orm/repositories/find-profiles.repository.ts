import { FindProfilesRepository } from '../../../../application/ports/find-profiles.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { Profile } from '../../../../domain/profile';
import { ProfileMapper } from '../mapper/profile.mapper';

@Injectable()
export class OrmFindProfilesRepository implements FindProfilesRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
  ) {}

  async findAll(): Promise<Array<Profile>> {
    const profileEntities: Array<ProfileEntity> =
      await this.profileRepository.find();
    return profileEntities.map(ProfileMapper.toDomain);
  }

  async findById(id: string): Promise<Profile | undefined> {
    const profileEntity: ProfileEntity | null =
      await this.profileRepository.findOneBy({ id: id });
    return profileEntity ? ProfileMapper.toDomain(profileEntity) : undefined;
  }

  async findByUserId(userId: string): Promise<Profile | undefined> {
    const profileEntity: ProfileEntity | null =
      await this.profileRepository.findOneBy({ userId: userId });
    return profileEntity ? ProfileMapper.toDomain(profileEntity) : undefined;
  }

  async existByUserId(userId: string): Promise<boolean> {
    return await this.profileRepository.exists({ where: { userId: userId } });
  }
}
