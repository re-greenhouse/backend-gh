import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ComparePasswordForUsernameQuery } from './compare-password-for-username.query';
import { FindUsersRepository } from '../ports/find-users.repository';
import { HashingService } from '../../../shared/application/outbound-services/hashing.service';

@QueryHandler(ComparePasswordForUsernameQuery)
export class ComparePasswordForUsernameQueryHandler
  implements IQueryHandler<ComparePasswordForUsernameQuery, boolean>
{
  constructor(
    private readonly findUsersRepository: FindUsersRepository,
    private readonly hashingService: HashingService,
  ) {}

  async execute(query: ComparePasswordForUsernameQuery): Promise<boolean> {
    const user = await this.findUsersRepository.findByUsername(query.username);
    if (user === undefined) {
      return false;
    }
    return await this.hashingService.compare(query.password, user.password);
  }
}
