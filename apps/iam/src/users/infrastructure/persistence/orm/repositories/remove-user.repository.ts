import { RemoveUserRepository } from '../../../../application/ports/remove-user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { User } from '../../../../domain/user';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class OrmRemoveUserRepository implements RemoveUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async remove(user: User): Promise<User> {
    const userEntity = UserMapper.toPersistence(user);
    await this.userRepository.remove(userEntity);
    return UserMapper.toDomain(userEntity);
  }
}
