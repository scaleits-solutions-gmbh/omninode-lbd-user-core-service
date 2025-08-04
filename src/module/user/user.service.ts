import { Injectable, Logger } from '@nestjs/common';
import {
  UserDao,
  GetUsersCollum,
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
import { CreateUserDto, UserDto, UserDtoUtils, UpdateUserDto } from './dto';

/**
 * Service for managing user operations including CRUD operations,
 * pagination, filtering, and business logic validation.
 *
 * This service handles all user-related database operations through UserDao
 * and provides comprehensive error handling and logging.
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async getUsers(
    query: Record<string, string>,
  ): Promise<PaginatedData<UserDto>> {
    const startTime = Date.now();
    this.logger.debug(`Fetching users with query: ${JSON.stringify(query)}`);

    try {
      const result = buildCustomParamsFromQuery(
        query,
        UserDao.cruds.getUsers.allowedFilterOptions,
        UserDao.cruds.getUsers.allowedSortOptions,
        true,
        UserDao.cruds.getUsers.maxPageSize,
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

      const customParams = result.customParams as CustomParams<GetUsersCollum>;
      this.logger.debug(`Built custom params: ${JSON.stringify(customParams)}`);

      const [users, total] = await Promise.all([
        UserDao.cruds.getUsers.fetch(customParams),
        UserDao.cruds.getUsers.fetchCount(customParams),
      ]);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved ${users.length} users out of ${total} total in ${duration}ms`,
      );

      const usersDto = UserDtoUtils.parseUserDtoList(users);

      return paginateExternalData<UserDto>(
        usersDto,
        total,
        customParams.paginationOption?.page ??
          UserDao.cruds.getUsers.defaultParams.paginationOption.page,
        customParams.paginationOption?.limit ??
          UserDao.cruds.getUsers.defaultParams.paginationOption.limit,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch users after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getUsersCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching users count');

    try {
      const count = await UserDao.cruds.getUsersCount.fetch();
      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved users count: ${count} in ${duration}ms`);
      return { count };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch users count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    const startTime = Date.now();
    this.logger.debug(`Fetching user by ID: ${id}`);

    try {
      const user = await UserDao.cruds.getUserById.fetch(id);

      if (!user) {
        this.logger.warn(`User not found with ID: ${id}`);
        throw new NestJsKit.NestJsNotFoundException('User not found', [
          {
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(`Successfully retrieved user ${id} in ${duration}ms`);
      return UserDtoUtils.parseUserDto(user);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch user ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const startTime = Date.now();
    this.logger.debug(`Creating new user: ${JSON.stringify(createUserDto)}`);

    try {
      const user = await UserDao.cruds.createUser.create(createUserDto);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully created user with ID: ${user.id} in ${duration}ms`,
      );

      return UserDtoUtils.parseUserDto(user);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create user after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const startTime = Date.now();
    this.logger.debug(`Updating user ${id}: ${JSON.stringify(updateUserDto)}`);

    try {
      const user = await UserDao.cruds.updateUser.update(id, updateUserDto);

      if (!user) {
        this.logger.warn(`User not found for update with ID: ${id}`);
        throw new NestJsKit.NestJsNotFoundException('User not found', [
          {
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(`Successfully updated user ${id} in ${duration}ms`);
      return UserDtoUtils.parseUserDto(user);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update user ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async deleteUser(id: string): Promise<UserDto> {
    const startTime = Date.now();
    this.logger.debug(`Deleting user: ${id}`);

    try {
      const user = await UserDao.cruds.deleteUser.delete(id);

      if (!user) {
        this.logger.warn(`User not found for deletion with ID: ${id}`);
        throw new NestJsKit.NestJsNotFoundException('User not found', [
          {
            message: 'User not found',
            code: 'USER_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(`Successfully deleted user ${id} in ${duration}ms`);
      return UserDtoUtils.parseUserDto(user);
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete user ${id} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
