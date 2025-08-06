import { Module } from '@nestjs/common';
import { IdentityProviderCrudsController } from './cruds/identity-provider.cruds.controller';
import { IdentityProviderCrudsService } from './cruds/identity-provider.cruds.service';
import { IdentityProviderOperationsController } from './operations/identity-provider.operations.controller';
import { UserIdentityProviderOperationsController } from './operations/user-identity-provider.operations.controller';
import { IdentityProviderOperationsService } from './operations/identity-provider.operations.service';

@Module({
  controllers: [
    IdentityProviderCrudsController,
    IdentityProviderOperationsController,
    UserIdentityProviderOperationsController,
  ],
  providers: [IdentityProviderCrudsService, IdentityProviderOperationsService],
  exports: [IdentityProviderCrudsService, IdentityProviderOperationsService],
})
export class IdentityProviderModule {}
