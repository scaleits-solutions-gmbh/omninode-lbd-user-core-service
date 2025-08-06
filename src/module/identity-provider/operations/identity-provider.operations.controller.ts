import { Controller, Post, Param, Body } from '@nestjs/common';
import { IdentityProviderOperationsService } from './identity-provider.operations.service';
import {
  ConfigureIdentityProviderDto,
  TestConnectionDto,
  SyncUsersDto,
  DisableIdentityProviderDto,
} from './dto';

/**
 * Controller for handling identity provider business logic operations.
 *
 * Provides REST API endpoints for complex identity provider operations:
 * - POST /identity-providers/operations/configure - Configure identity provider
 * - POST /identity-providers/operations/:id/test-connection - Test provider connection
 * - POST /identity-providers/operations/:id/sync-users - Sync users from provider
 * - POST /identity-providers/operations/:id/disable - Disable identity provider
 */
@Controller('identity-providers/operations')
export class IdentityProviderOperationsController {
  constructor(
    private readonly identityProviderOperationsService: IdentityProviderOperationsService,
  ) {}

  @Post('/configure')
  async configureIdentityProvider(
    @Body() configureIdentityProviderDto: ConfigureIdentityProviderDto,
  ): Promise<{ message: string; providerId?: string }> {
    return this.identityProviderOperationsService.configureIdentityProvider(
      configureIdentityProviderDto,
    );
  }

  @Post('/:id/test-connection')
  async testConnection(
    @Param('id') providerId: string,
    @Body() testConnectionDto: TestConnectionDto,
  ): Promise<{ message: string; isConnected: boolean; details?: any }> {
    return this.identityProviderOperationsService.testConnection(
      providerId,
      testConnectionDto,
    );
  }

  @Post('/:id/sync-users')
  async syncUsers(
    @Param('id') providerId: string,
    @Body() syncUsersDto: SyncUsersDto,
  ): Promise<{ message: string; syncedCount: number; errors?: any[] }> {
    return this.identityProviderOperationsService.syncUsers(
      providerId,
      syncUsersDto,
    );
  }

  @Post('/:id/disable')
  async disableIdentityProvider(
    @Param('id') providerId: string,
    @Body() disableIdentityProviderDto: DisableIdentityProviderDto,
  ): Promise<{ message: string }> {
    return this.identityProviderOperationsService.disableIdentityProvider(
      providerId,
      disableIdentityProviderDto,
    );
  }
}
