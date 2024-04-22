import { CreateUserRepository } from '../../../../application/ports/create-user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/user';
import { UserMapper } from '../mapper/user.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmCreateUserRepository implements CreateUserRepository {
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
