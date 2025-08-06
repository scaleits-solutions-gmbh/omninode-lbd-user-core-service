import { Injectable, Logger } from '@nestjs/common';
import {
  IdentityProviderDao,
  GetIdentityProvidersCollum,
} from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import {
  CustomParams,
  NestJsKit,
  buildCustomParamsFromQuery,
} from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';
import {
  PaginatedData,
  paginateExternalData,
} from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import {
  CreateIdentityProviderDto,
  UpdateIdentityProviderDto,
  IdentityProviderDto,
  IdentityProviderDtoUtils,
} from './dto';

/**
 * Service for managing basic identity provider CRUD operations.
 *
 * This service handles all basic identity provider database operations through IdentityProviderDao
 * and provides comprehensive error handling and logging for CRUD operations.
 */
@Injectable()
export class IdentityProviderCrudsService {
  private readonly logger = new Logger(IdentityProviderCrudsService.name);

  async getIdentityProviders(
    query: Record<string, string>,
  ): Promise<PaginatedData<IdentityProviderDto>> {
    const startTime = Date.now();
    this.logger.debug(
      `Fetching identity providers with query: ${JSON.stringify(query)}`,
    );

    try {
      const result = buildCustomParamsFromQuery(
        query,
        IdentityProviderDao.cruds.getIdentityProviders.allowedFilterOptions,
        IdentityProviderDao.cruds.getIdentityProviders.allowedSortOptions,
        true,
        IdentityProviderDao.cruds.getIdentityProviders.maxPageSize,
      );

      if (!result.success) {
        this.logger.warn(
          `Invalid query parameters: ${JSON.stringify(result.errorDetails)}`,
        );
        throw new NestJsKit.NestJsBadRequestException(
          'Validation Failed',
          result.errorDetails,
        );
      }

      const customParams =
        result.customParams as CustomParams<GetIdentityProvidersCollum>;
      this.logger.debug(`Built custom params: ${JSON.stringify(customParams)}`);

      const [providers, total] = await Promise.all([
        IdentityProviderDao.cruds.getIdentityProviders.fetch(customParams),
        IdentityProviderDao.cruds.getIdentityProviders.fetchCount(customParams),
      ]);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved ${providers.length} identity providers out of ${total} total in ${duration}ms`,
      );

      const providersDto =
        IdentityProviderDtoUtils.parseIdentityProviderDtoList(providers);

      return paginateExternalData<IdentityProviderDto>(
        providersDto,
        total,
        customParams.paginationOption?.page ??
          IdentityProviderDao.cruds.getIdentityProviders.defaultParams
            .paginationOption.page,
        customParams.paginationOption?.limit ??
          IdentityProviderDao.cruds.getIdentityProviders.defaultParams
            .paginationOption.limit,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch identity providers after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getIdentityProvidersCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching identity providers count');

    try {
      const count =
        await IdentityProviderDao.cruds.getIdentityProvidersCount.fetch();
      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved identity providers count: ${count} in ${duration}ms`,
      );
      return { count };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch identity providers count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getIdentityProviderById(id: string): Promise<IdentityProviderDto> {
    const startTime = Date.now();
    this.logger.debug(`Fetching identity provider by ID: ${id}`);

    try {
      const provider =
        await IdentityProviderDao.cruds.getIdentityProviderById.fetch(id);

      if (!provider) {
        this.logger.warn(`Identity provider not found with ID: ${id}`);
        throw new NestJsKit.NestJsNotFoundException(
          'Identity provider not found',
          [
            {
              message: 'Identity provider not found',
              code: 'IDENTITY_PROVIDER_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully retrieved identity provider ${id} in ${duration}ms`,
      );
      return IdentityProviderDtoUtils.parseIdentityProviderDto(provider);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch identity provider ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async createIdentityProvider(
    createIdentityProviderDto: CreateIdentityProviderDto,
  ): Promise<IdentityProviderDto> {
    const startTime = Date.now();
    this.logger.debug(
      `Creating new identity provider: ${JSON.stringify(createIdentityProviderDto)}`,
    );

    try {
      const provider =
        await IdentityProviderDao.cruds.createIdentityProvider.create(
          createIdentityProviderDto,
        );

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully created identity provider with ID: ${provider.id} in ${duration}ms`,
      );

      return IdentityProviderDtoUtils.parseIdentityProviderDto(provider);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create identity provider after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async updateIdentityProvider(
    id: string,
    updateIdentityProviderDto: UpdateIdentityProviderDto,
  ): Promise<IdentityProviderDto> {
    const startTime = Date.now();
    this.logger.debug(
      `Updating identity provider ${id}: ${JSON.stringify(updateIdentityProviderDto)}`,
    );

    try {
      const provider =
        await IdentityProviderDao.cruds.updateIdentityProvider.update(
          id,
          updateIdentityProviderDto,
        );

      if (!provider) {
        this.logger.warn(
          `Identity provider not found for update with ID: ${id}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'Identity provider not found',
          [
            {
              message: 'Identity provider not found',
              code: 'IDENTITY_PROVIDER_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully updated identity provider ${id} in ${duration}ms`,
      );
      return IdentityProviderDtoUtils.parseIdentityProviderDto(provider);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update identity provider ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async deleteIdentityProvider(id: string): Promise<IdentityProviderDto> {
    const startTime = Date.now();
    this.logger.debug(`Deleting identity provider: ${id}`);

    try {
      const provider =
        await IdentityProviderDao.cruds.deleteIdentityProvider.delete(id);

      if (!provider) {
        this.logger.warn(
          `Identity provider not found for deletion with ID: ${id}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'Identity provider not found',
          [
            {
              message: 'Identity provider not found',
              code: 'IDENTITY_PROVIDER_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully deleted identity provider ${id} in ${duration}ms`,
      );
      return IdentityProviderDtoUtils.parseIdentityProviderDto(provider);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete identity provider ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
