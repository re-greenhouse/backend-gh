import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from './get-users.query';
import { User } from '../../domain/user';
import { FindUsersRepository } from '../ports/find-users.repository';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler
  implements IQueryHandler<GetUsersQuery, Array<User>>
{
  constructor(private readonly findUsersRepository: FindUsersRepository) {}

  async execute({}: GetUsersQuery): Promise<Array<User>> {
    return this.findUsersRepository.findAll();
  }
}
