import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { FindUsersRepository } from '../ports/find-users.repository';
import { GetUserByUsernameQuery } from './get-user-by-username.query';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameQueryHandler
  implements IQueryHandler<GetUserByUsernameQuery, User>
{
  constructor(private readonly findUsersRepository: FindUsersRepository) {}

  async execute(query: GetUserByUsernameQuery): Promise<User> {
    const user = await this.findUsersRepository.findByUsername(query.username);
    if (user === undefined) {
      throw new GrpcNotFoundException(
        `User '${query.username}' doesn't exists.`,
      );
    }
    return user;
  }
}
