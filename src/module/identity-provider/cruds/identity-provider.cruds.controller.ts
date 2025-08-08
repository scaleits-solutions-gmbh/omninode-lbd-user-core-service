import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import lambdaConfig from '../../../../lambda-config';
import { Logger, Inject } from '@nestjs/common';
import { IdentityProviderCrudsService } from './identity-provider.cruds.service';
import {
  CreateIdentityProviderDto,
  UpdateIdentityProviderDto,
  GetIdentityProviderByIdDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { IdentityProvider } from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling basic identity provider CRUD operations.
 *
 * Provides REST API endpoints for basic identity provider data manipulation:
 * - GET /identity-providers/cruds - List identity providers with pagination and filtering
 * - GET /identity-providers/cruds/count - Get total identity providers count
 * - GET /identity-providers/cruds/:id - Get identity provider by ID
 * - POST /identity-providers/cruds - Create new identity provider
 * - PUT /identity-providers/cruds/:id - Update identity provider
 * - DELETE /identity-providers/cruds/:id - Delete identity provider
 */
@ApiTags('identity-providers')
@Controller(`${lambdaConfig.custom.cutomPath}/cruds/identity-providers`)
export class IdentityProviderCrudsController {
  private readonly logger = new Logger(IdentityProviderCrudsController.name);

  constructor(
    @Inject(IdentityProviderCrudsService)
    private readonly identityProviderCrudsService: IdentityProviderCrudsService,
  ) {
    this.logger.debug('IdentityProviderCrudsController: Constructor');
  }

  @Get()
  @ApiOperation({ summary: 'List identity providers with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated identity providers' })
  async getIdentityProviders(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<IdentityProvider>> {
    return this.identityProviderCrudsService.getIdentityProviders(query);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get identity providers count' })
  @ApiResponse({ status: 200, description: 'Count of identity providers' })
  async getIdentityProvidersCount(): Promise<{ count: number }> {
    return this.identityProviderCrudsService.getIdentityProvidersCount();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get identity provider by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Identity provider found' })
  async getIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
  ): Promise<IdentityProvider> {
    return this.identityProviderCrudsService.getIdentityProviderById(
      getIdentityProviderByIdDto.id,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create identity provider' })
  @ApiResponse({ status: 201, description: 'Identity provider created' })
  async createIdentityProvider(
    @Body() createIdentityProviderDto: CreateIdentityProviderDto,
  ): Promise<IdentityProvider> {
    return this.identityProviderCrudsService.createIdentityProvider(
      createIdentityProviderDto,
    );
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update identity provider' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Identity provider updated' })
  async updateIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
    @Body() updateIdentityProviderDto: UpdateIdentityProviderDto,
  ): Promise<IdentityProvider> {
    return this.identityProviderCrudsService.updateIdentityProvider(
      getIdentityProviderByIdDto.id,
      updateIdentityProviderDto,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete identity provider' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Identity provider deleted' })
  async deleteIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
  ): Promise<IdentityProvider> {
    return this.identityProviderCrudsService.deleteIdentityProvider(
      getIdentityProviderByIdDto.id,
    );
  }
}
