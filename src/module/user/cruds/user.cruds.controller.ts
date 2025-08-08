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
import { UserCrudsService } from './user.cruds.service';
import { CreateUserDto, UpdateUserDto, GetUserByIdDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { User } from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller for handling basic user CRUD operations.
 *
 * Provides REST API endpoints for basic user data manipulation:
 * - GET /users/cruds - List users with pagination and filtering
 * - GET /users/cruds/count - Get total users count
 * - GET /users/cruds/:userId - Get user by ID
 * - POST /users/cruds - Create new user
 * - PUT /users/cruds/:userId - Update user
 * - DELETE /users/cruds/:userId - Delete user
 */
@ApiTags('users')
@Controller(`${lambdaConfig.custom.cutomPath}/cruds/users`)
export class UserCrudsController {
  private readonly logger = new Logger(UserCrudsController.name);

  constructor(
    @Inject(UserCrudsService)
    private readonly userCrudsService: UserCrudsService,
  ) {
    this.logger.debug('UserCrudsController: Constructor');
  }

  @Get()
  @ApiOperation({ summary: 'List users with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Page size' })
  @ApiResponse({ status: 200, description: 'Paginated list of users' })
  async getUsers(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<User>> {
    return this.userCrudsService.getUsers(query);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get total users count' })
  @ApiResponse({ status: 200, description: 'Users count' })
  async getUsersCount(): Promise<{ count: number }> {
    return this.userCrudsService.getUsersCount();
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  async getUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
    return this.userCrudsService.getUserById(getUserByIdDto.userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userCrudsService.createUser(createUserDto);
  }

  @Put('/:userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User updated' })
  async updateUser(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userCrudsService.updateUser(
      getUserByIdDto.userId,
      updateUserDto,
    );
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted' })
  async deleteUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
    return this.userCrudsService.deleteUser(getUserByIdDto.userId);
  }
}
