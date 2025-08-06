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
import { UserCrudsService } from './user.cruds.service';
import { UserDto, CreateUserDto, UpdateUserDto, GetUserByIdDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

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
@Controller('users/cruds')
export class UserCrudsController {
  constructor(private readonly userCrudsService: UserCrudsService) {}

  @Get()
  async getUsers(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<UserDto>> {
    return this.userCrudsService.getUsers(query);
  }

  @Get('/count')
  async getUsersCount(): Promise<{ count: number }> {
    return this.userCrudsService.getUsersCount();
  }

  @Get('/:userId')
  async getUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<UserDto> {
    const user = await this.userCrudsService.getUserById(getUserByIdDto.userId);

    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userCrudsService.createUser(createUserDto);
  }

  @Put('/:userId')
  async updateUser(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userCrudsService.updateUser(
      getUserByIdDto.userId,
      updateUserDto,
    );
    return user;
  }

  @Delete('/:userId')
  async deleteUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<UserDto> {
    const user = await this.userCrudsService.deleteUser(getUserByIdDto.userId);
    return user;
  }
}
