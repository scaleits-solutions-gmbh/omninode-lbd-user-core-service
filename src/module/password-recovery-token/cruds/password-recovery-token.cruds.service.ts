import { Injectable, Logger } from '@nestjs/common';
import {
  PasswordRecoveryTokenDao,
  GetPasswordRecoveryTokensCollum,
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
  CreatePasswordRecoveryTokenDto,
  UpdatePasswordRecoveryTokenDto,
  PasswordRecoveryTokenDto,
  PasswordRecoveryTokenDtoUtils,
} from './dto';

/**
 * Service for managing basic password recovery token CRUD operations.
 *
 * This service handles all basic password recovery token database operations through PasswordRecoveryTokenDao
 * and provides comprehensive error handling and logging for CRUD operations.
 */
@Injectable()
export class PasswordRecoveryTokenCrudsService {
  private readonly logger = new Logger(PasswordRecoveryTokenCrudsService.name);

  async getPasswordRecoveryTokens(
    query: Record<string, string>,
  ): Promise<PaginatedData<PasswordRecoveryTokenDto>> {
    const startTime = Date.now();
    this.logger.debug(
      `Fetching password recovery tokens with query: ${JSON.stringify(query)}`,
    );

    try {
      const result = buildCustomParamsFromQuery(
        query,
        PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens
          .allowedFilterOptions,
        PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens
          .allowedSortOptions,
        true,
        PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens.maxPageSize,
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
        result.customParams as CustomParams<GetPasswordRecoveryTokensCollum>;
      this.logger.debug(`Built custom params: ${JSON.stringify(customParams)}`);

      const [tokens, total] = await Promise.all([
        PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens.fetch(
          customParams,
        ),
        PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens.fetchCount(
          customParams,
        ),
      ]);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved ${tokens.length} password recovery tokens out of ${total} total in ${duration}ms`,
      );

      const tokensDto =
        PasswordRecoveryTokenDtoUtils.parsePasswordRecoveryTokenDtoList(tokens);

      return paginateExternalData<PasswordRecoveryTokenDto>(
        tokensDto,
        total,
        customParams.paginationOption?.page ??
          PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens.defaultParams
            .paginationOption.page,
        customParams.paginationOption?.limit ??
          PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokens.defaultParams
            .paginationOption.limit,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch password recovery tokens after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getPasswordRecoveryTokensCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching password recovery tokens count');

    try {
      const count =
        await PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokensCount.fetch();
      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved password recovery tokens count: ${count} in ${duration}ms`,
      );
      return { count };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch password recovery tokens count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getPasswordRecoveryTokenById(
    tokenId: string,
  ): Promise<PasswordRecoveryTokenDto> {
    const startTime = Date.now();
    this.logger.debug(`Fetching password recovery token by ID: ${tokenId}`);

    try {
      const token =
        await PasswordRecoveryTokenDao.cruds.getPasswordRecoveryTokenById.fetch(
          tokenId,
        );

      if (!token) {
        this.logger.warn(
          `Password recovery token not found with ID: ${tokenId}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'Password recovery token not found',
          [
            {
              message: 'Password recovery token not found',
              code: 'PASSWORD_RECOVERY_TOKEN_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully retrieved password recovery token ${tokenId} in ${duration}ms`,
      );
      return PasswordRecoveryTokenDtoUtils.parsePasswordRecoveryTokenDto(token);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch password recovery token ${tokenId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async createPasswordRecoveryToken(
    createPasswordRecoveryTokenDto: CreatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryTokenDto> {
    const startTime = Date.now();
    this.logger.debug(
      `Creating new password recovery token: ${JSON.stringify(createPasswordRecoveryTokenDto)}`,
    );

    try {
      const token =
        await PasswordRecoveryTokenDao.cruds.createPasswordRecoveryToken.create(
          createPasswordRecoveryTokenDto,
        );

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully created password recovery token with ID: ${token.id} in ${duration}ms`,
      );

      return PasswordRecoveryTokenDtoUtils.parsePasswordRecoveryTokenDto(token);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create password recovery token after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async updatePasswordRecoveryToken(
    tokenId: string,
    updatePasswordRecoveryTokenDto: UpdatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryTokenDto> {
    const startTime = Date.now();
    this.logger.debug(
      `Updating password recovery token ${tokenId}: ${JSON.stringify(updatePasswordRecoveryTokenDto)}`,
    );

    try {
      const token =
        await PasswordRecoveryTokenDao.cruds.updatePasswordRecoveryToken.update(
          tokenId,
          updatePasswordRecoveryTokenDto,
        );

      if (!token) {
        this.logger.warn(
          `Password recovery token not found for update with ID: ${tokenId}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'Password recovery token not found',
          [
            {
              message: 'Password recovery token not found',
              code: 'PASSWORD_RECOVERY_TOKEN_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully updated password recovery token ${tokenId} in ${duration}ms`,
      );
      return PasswordRecoveryTokenDtoUtils.parsePasswordRecoveryTokenDto(token);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update password recovery token ${tokenId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async deletePasswordRecoveryToken(
    tokenId: string,
  ): Promise<PasswordRecoveryTokenDto> {
    const startTime = Date.now();
    this.logger.debug(`Deleting password recovery token: ${tokenId}`);

    try {
      const token =
        await PasswordRecoveryTokenDao.cruds.deletePasswordRecoveryToken.delete(
          tokenId,
        );

      if (!token) {
        this.logger.warn(
          `Password recovery token not found for deletion with ID: ${tokenId}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'Password recovery token not found',
          [
            {
              message: 'Password recovery token not found',
              code: 'PASSWORD_RECOVERY_TOKEN_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully deleted password recovery token ${tokenId} in ${duration}ms`,
      );
      return PasswordRecoveryTokenDtoUtils.parsePasswordRecoveryTokenDto(token);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete password recovery token ${tokenId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
