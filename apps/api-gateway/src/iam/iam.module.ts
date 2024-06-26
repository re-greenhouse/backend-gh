import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { IAM_SERVICE } from './constants';
import { IAM_PACKAGE_NAME } from '@app/common';
import { join } from 'path';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { SharedModule } from '../shared/shared.module';
import { PersonasModule } from '../personas/personas.module';
import { UserFacadeService } from './facades/user-facade.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: IAM_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: IAM_PACKAGE_NAME,
          protoPath: join(__dirname, '../iam.proto'),
        },
      },
    ]),
    forwardRef(() => PersonasModule),
    SharedModule,
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, UsersService, UserFacadeService],
  exports: [UserFacadeService],
})
export class IamModule {}
