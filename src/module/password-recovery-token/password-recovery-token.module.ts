import { Module } from '@nestjs/common';
import { PasswordRecoveryTokenCrudsController } from './cruds/password-recovery-token.cruds.controller';
import { PasswordRecoveryTokenCrudsService } from './cruds/password-recovery-token.cruds.service';
import { PasswordRecoveryTokenOperationsController } from './operations/password-recovery-token.operations.controller';
import { PasswordRecoveryTokenOperationsService } from './operations/password-recovery-token.operations.service';

@Module({
  controllers: [
    PasswordRecoveryTokenCrudsController,
    PasswordRecoveryTokenOperationsController,
  ],
  providers: [
    PasswordRecoveryTokenCrudsService,
    PasswordRecoveryTokenOperationsService,
  ],
  exports: [
    PasswordRecoveryTokenCrudsService,
    PasswordRecoveryTokenOperationsService,
  ],
})
export class PasswordRecoveryTokenModule {}
