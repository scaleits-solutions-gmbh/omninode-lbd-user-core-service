import { Controller, Get, Post, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IdentityProviderOperationsService } from './identity-provider.operations.service';
import { LinkUserToProviderDto, UnlinkUserFromProviderDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling user-specific identity provider operations.
 *
 * Provides REST API endpoints for user identity provider management:
 * - GET /users/:userId/identity-providers/operations - Get user's identity providers
 * - POST /users/:userId/identity-providers/operations/link - Link user to identity provider
 * - DELETE /users/:userId/identity-providers/operations/:providerId/unlink - Unlink user from identity provider
 * - POST /users/:userId/identity-providers/operations/sync - Sync user from identity provider
 */
@ApiTags('user-identity-provider-operations')
@Controller('users/:userId/identity-providers/operations')
export class UserIdentityProviderOperationsController {
  constructor(
    private readonly identityProviderOperationsService: IdentityProviderOperationsService,
  ) {}

  @Get()
  @ApiOperation({ summary: "List a user's identity providers" })
  @ApiParam({ name: 'userId', required: true })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated identity providers for user' })
  async getUserIdentityProviders(
    @Param('userId') userId: string,
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.identityProviderOperationsService.getUserIdentityProviders(
      userId,
      query,
    );
  }

  @Post('/link')
  @ApiOperation({ summary: 'Link user to identity provider' })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, description: 'Link created' })
  async linkUserToIdentityProvider(
    @Param('userId') userId: string,
    @Body() linkUserToProviderDto: LinkUserToProviderDto,
  ): Promise<{ message: string; linkId?: string }> {
    return this.identityProviderOperationsService.linkUserToIdentityProvider(
      userId,
      linkUserToProviderDto,
    );
  }

  @Delete('/:providerId/unlink')
  @ApiOperation({ summary: 'Unlink user from identity provider' })
  @ApiParam({ name: 'userId', required: true })
  @ApiParam({ name: 'providerId', required: true })
  @ApiResponse({ status: 200, description: 'Unlinked' })
  async unlinkUserFromIdentityProvider(
    @Param('userId') userId: string,
    @Param('providerId') providerId: string,
    @Body() unlinkUserFromProviderDto: UnlinkUserFromProviderDto,
  ): Promise<{ message: string }> {
    return this.identityProviderOperationsService.unlinkUserFromIdentityProvider(
      userId,
      providerId,
      unlinkUserFromProviderDto,
    );
  }

  @Post('/sync')
  @ApiOperation({ summary: 'Sync user from provider' })
  @ApiParam({ name: 'userId', required: true })
  @ApiResponse({ status: 200, description: 'Sync result' })
  async syncUserFromIdentityProvider(
    @Param('userId') userId: string,
  ): Promise<{ message: string; syncedData?: any }> {
    return this.identityProviderOperationsService.syncUserFromIdentityProvider(
      userId,
    );
  }
}
