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
import { UserService } from './user.service';
import { UserDto, CreateUserDto, UpdateUserDto, GetUserByIdDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling user-related HTTP requests.
 *
 * Provides REST API endpoints for user CRUD operations including:
 * - GET /users - List users with pagination and filtering
 * - GET /users/count - Get total users count
 * - GET /users/:userId - Get user by ID
 * - POST /users - Create new user
 * - PUT /users/:userId - Update user
 * - DELETE /users/:userId - Delete user
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<UserDto>> {
    return this.userService.getUsers(query);
  }

  @Get('/count')
  async getUsersCount(): Promise<{ count: number }> {
    return this.userService.getUsersCount();
  }

  @Get('/:userId')
  async getUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<UserDto> {
    const user = await this.userService.getUserById(getUserByIdDto.userId);

    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Put('/:userId')
  async updateUser(
    @Param() getUserByIdDto: GetUserByIdDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.userService.updateUser(
      getUserByIdDto.userId,
      updateUserDto,
    );
    return user;
  }

  @Delete('/:userId')
  async deleteUser(@Param() getUserByIdDto: GetUserByIdDto): Promise<UserDto> {
    const user = await this.userService.deleteUser(getUserByIdDto.userId);
    return user;
  }
}
