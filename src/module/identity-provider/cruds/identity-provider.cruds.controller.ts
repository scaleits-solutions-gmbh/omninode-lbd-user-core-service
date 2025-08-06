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
import { IdentityProviderCrudsService } from './identity-provider.cruds.service';
import {
  IdentityProviderDto,
  CreateIdentityProviderDto,
  UpdateIdentityProviderDto,
  GetIdentityProviderByIdDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

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
@Controller('identity-providers/cruds')
export class IdentityProviderCrudsController {
  constructor(
    private readonly identityProviderCrudsService: IdentityProviderCrudsService,
  ) {}

  @Get()
  async getIdentityProviders(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<IdentityProviderDto>> {
    return this.identityProviderCrudsService.getIdentityProviders(query);
  }

  @Get('/count')
  async getIdentityProvidersCount(): Promise<{ count: number }> {
    return this.identityProviderCrudsService.getIdentityProvidersCount();
  }

  @Get('/:id')
  async getIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
  ): Promise<IdentityProviderDto> {
    return this.identityProviderCrudsService.getIdentityProviderById(
      getIdentityProviderByIdDto.id,
    );
  }

  @Post()
  async createIdentityProvider(
    @Body() createIdentityProviderDto: CreateIdentityProviderDto,
  ): Promise<IdentityProviderDto> {
    return this.identityProviderCrudsService.createIdentityProvider(
      createIdentityProviderDto,
    );
  }

  @Put('/:id')
  async updateIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
    @Body() updateIdentityProviderDto: UpdateIdentityProviderDto,
  ): Promise<IdentityProviderDto> {
    return this.identityProviderCrudsService.updateIdentityProvider(
      getIdentityProviderByIdDto.id,
      updateIdentityProviderDto,
    );
  }

  @Delete('/:id')
  async deleteIdentityProvider(
    @Param() getIdentityProviderByIdDto: GetIdentityProviderByIdDto,
  ): Promise<IdentityProviderDto> {
    return this.identityProviderCrudsService.deleteIdentityProvider(
      getIdentityProviderByIdDto.id,
    );
  }
}
