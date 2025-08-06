import { Module } from '@nestjs/common';
import { UserCrudsController } from './cruds/user.cruds.controller';
import { UserCrudsService } from './cruds/user.cruds.service';
import { UserOperationsController } from './operations/user.operations.controller';
import { UserOperationsService } from './operations/user.operations.service';

@Module({
  controllers: [UserCrudsController, UserOperationsController],
  providers: [UserCrudsService, UserOperationsService],
  exports: [UserCrudsService, UserOperationsService],
})
export class UserModule {}
