import { Injectable } from '@nestjs/common';
import { SaveUserRepository } from '../../../../application/ports/save-user.repository';
import { User } from '../../../../domain/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class OrmSaveUserRepository implements SaveUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(user);
    const newEntity = await this.userRepository.save(persistenceModel);
    return UserMapper.toDomain(newEntity);
  }
}
