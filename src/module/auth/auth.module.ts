import { Module } from '@nestjs/common';
import { AuthCrudsController } from './cruds/auth.cruds.controller';
import { AuthCrudsService } from './cruds/auth.cruds.service';
import {
  AuthOperationsController,
  UserAuthOperationsController,
} from './operations/auth.operations.controller';
import { AuthOperationsService } from './operations/auth.operations.service';

@Module({
  controllers: [
    AuthCrudsController,
    AuthOperationsController,
    UserAuthOperationsController,
  ],
  providers: [AuthCrudsService, AuthOperationsService],
  exports: [AuthCrudsService, AuthOperationsService],
})
export class AuthModule {}
