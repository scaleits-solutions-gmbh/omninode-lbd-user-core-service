import { Injectable, Logger } from '@nestjs/common';
import {
  UserCompanyDao,
  UserDao,
  CompanyDao,
  GetUserCompaniesColumn,
  UserCompany,
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
import { CreateUserCompanyDto, UpdateUserCompanyDto } from './dto/input';

/**
 * Service for managing basic user-company relationship CRUD operations.
 *
 * This service handles all basic user-company database operations through UserCompanyDao
 * and provides comprehensive error handling and logging for CRUD operations.
 */
@Injectable()
export class UserCompanyCrudsService {
  private readonly logger = new Logger(UserCompanyCrudsService.name);

  async getUserCompanies(
    query: Record<string, string>,
  ): Promise<PaginatedData<UserCompany>> {
    const startTime = Date.now();
    this.logger.debug(
      `Fetching user-companies with query: ${JSON.stringify(query)}`,
    );

    try {
      const result = buildCustomParamsFromQuery(
        query,
        UserCompanyDao.cruds.getUserCompanies.allowedFilterOptions,
        UserCompanyDao.cruds.getUserCompanies.allowedSortOptions,
        true,
        UserCompanyDao.cruds.getUserCompanies.maxPageSize,
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
        result.customParams as CustomParams<GetUserCompaniesColumn>;
      this.logger.debug(`Built custom params: ${JSON.stringify(customParams)}`);

      const [userCompanies, total] = await Promise.all([
        UserCompanyDao.cruds.getUserCompanies.fetch(customParams),
        UserCompanyDao.cruds.getUserCompanies.fetchCount(customParams),
      ]);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved ${userCompanies.length} user-companies out of ${total} total in ${duration}ms`,
      );

      return paginateExternalData<UserCompany>(
        userCompanies as unknown as UserCompany[],
        total,
        customParams.paginationOption?.page ??
          UserCompanyDao.cruds.getUserCompanies.defaultParams.paginationOption
            .page,
        customParams.paginationOption?.limit ??
          UserCompanyDao.cruds.getUserCompanies.defaultParams.paginationOption
            .limit,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch user-companies after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getUserCompaniesCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching user-companies count');

    try {
      const count = await UserCompanyDao.cruds.getUserCompaniesCount.fetch();
      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved user-companies count: ${count} in ${duration}ms`,
      );
      return { count };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch user-companies count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getUserCompanyById(id: string): Promise<UserCompany> {
    const startTime = Date.now();
    this.logger.debug(`Fetching user-company by ID: ${id}`);

    try {
      const userCompany =
        await UserCompanyDao.cruds.getUserCompanyById.fetch(id);

      if (!userCompany) {
        this.logger.warn(`User-company relationship not found with ID: ${id}`);
        throw new NestJsKit.NestJsNotFoundException(
          'User-company relationship not found',
          [
            {
              message: 'User-company relationship not found',
              code: 'USER_COMPANY_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully retrieved user-company ${id} in ${duration}ms`,
      );
      return userCompany;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch user-company ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async createUserCompany(
    createUserCompanyDto: CreateUserCompanyDto,
  ): Promise<UserCompany> {
    const startTime = Date.now();
    this.logger.debug(
      `Creating new user-company: ${JSON.stringify(createUserCompanyDto)}`,
    );

    try {
      // Validate user exists before creating user-company relationship
      const user = await UserDao.cruds.getUserById.fetch(
        createUserCompanyDto.userId,
      );

      if (!user) {
        this.logger.warn(
          `User not found with ID: ${createUserCompanyDto.userId}`,
        );
        throw new NestJsKit.NestJsNotFoundException('User not found', [
          {
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        ]);
      }

      // Validate company exists before creating user-company relationship
      const company = await CompanyDao.cruds.getCompanyById.fetch(
        createUserCompanyDto.companyId,
      );

      if (!company) {
        this.logger.warn(
          `Company not found with ID: ${createUserCompanyDto.companyId}`,
        );
        throw new NestJsKit.NestJsNotFoundException('Company not found', [
          {
            message: 'Company not found',
            code: 'COMPANY_NOT_FOUND',
          },
        ]);
      }

      const newUserCompany = {
        userId: createUserCompanyDto.userId,
        companyId: createUserCompanyDto.companyId,
        managementConsoleAccess: createUserCompanyDto.managementConsoleAccess,
      };

      const userCompany =
        await UserCompanyDao.cruds.createUserCompany.create(newUserCompany);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully created user-company with ID: ${userCompany.id} in ${duration}ms`,
      );

      return userCompany;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create user-company after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async updateUserCompany(
    id: string,
    updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<UserCompany> {
    const startTime = Date.now();
    this.logger.debug(
      `Updating user-company ${id}: ${JSON.stringify(updateUserCompanyDto)}`,
    );

    try {
      const updatedUserCompany: Partial<{
        managementConsoleAccess: string;
      }> = {};

      if (updateUserCompanyDto.managementConsoleAccess !== undefined) {
        updatedUserCompany.managementConsoleAccess =
          updateUserCompanyDto.managementConsoleAccess;
      }

      const userCompany = await UserCompanyDao.cruds.updateUserCompany.update(
        id,
        updatedUserCompany,
      );

      if (!userCompany) {
        this.logger.warn(
          `User-company relationship not found for update with ID: ${id}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'User-company relationship not found',
          [
            {
              message: 'User-company relationship not found',
              code: 'USER_COMPANY_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully updated user-company ${id} in ${duration}ms`,
      );
      return userCompany;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update user-company ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async deleteUserCompany(id: string): Promise<UserCompany> {
    const startTime = Date.now();
    this.logger.debug(`Deleting user-company: ${id}`);

    try {
      const userCompany =
        await UserCompanyDao.cruds.deleteUserCompany.delete(id);

      if (!userCompany) {
        this.logger.warn(
          `User-company relationship not found for deletion with ID: ${id}`,
        );
        throw new NestJsKit.NestJsNotFoundException(
          'User-company relationship not found',
          [
            {
              message: 'User-company relationship not found',
              code: 'USER_COMPANY_NOT_FOUND',
            },
          ],
        );
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully deleted user-company ${id} in ${duration}ms`,
      );
      return userCompany;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete user-company ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
