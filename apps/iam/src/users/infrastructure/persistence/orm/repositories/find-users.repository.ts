import { Injectable } from '@nestjs/common';
import { FindUsersRepository } from '../../../../application/ports/find-users.repository';
import { User } from '../../../../domain/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class OrmFindUsersRepository implements FindUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<Array<User>> {
    const userEntities: Array<UserEntity> = await this.userRepository.find();
    return userEntities.map(UserMapper.toDomain);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const userEntity: UserEntity | null = await this.userRepository.findOneBy({
      username: username,
    });
    return userEntity ? UserMapper.toDomain(userEntity) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userEntity: UserEntity | null = await this.userRepository.findOneBy({
      email: email,
    });
    return userEntity ? UserMapper.toDomain(userEntity) : undefined;
  }
}
