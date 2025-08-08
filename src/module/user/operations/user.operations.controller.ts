import { Controller, Post, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserOperationsService } from './user.operations.service';
import {
  UserRegistrationDto,
  EmailVerificationDto,
  ResendVerificationDto,
  UpdateProfileDto,
  ChangePasswordDto,
  DeactivateUserDto,
  ReactivateUserDto,
} from './dto';

/**
 * Controller for handling user business logic operations.
 *
 * Provides REST API endpoints for complex user operations:
 * - POST /users/operations/register - User registration with validation
 * - POST /users/operations/verify-email - Email verification
 * - POST /users/operations/resend-verification - Resend email verification
 * - POST /users/operations/:id/update-profile - Update user profile
 * - POST /users/operations/:id/change-password - Change password
 * - POST /users/operations/:id/deactivate - Deactivate user account
 * - POST /users/operations/:id/reactivate - Reactivate user account
 */
@ApiTags('users-operations')
@Controller('users/operations')
export class UserOperationsController {
  constructor(private readonly userOperationsService: UserOperationsService) {}

  @Post('/register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 200, description: 'User registered' })
  async registerUser(
    @Body() userRegistrationDto: UserRegistrationDto,
  ): Promise<{ message: string; userId?: string }> {
    return this.userOperationsService.registerUser(userRegistrationDto);
  }

  @Post('/verify-email')
  @ApiOperation({ summary: 'Email verification' })
  @ApiResponse({ status: 200, description: 'Email verified' })
  async verifyEmail(
    @Body() emailVerificationDto: EmailVerificationDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.verifyEmail(emailVerificationDto);
  }

  @Post('/resend-verification')
  @ApiOperation({ summary: 'Resend verification email' })
  @ApiResponse({ status: 200, description: 'Verification email resent' })
  async resendVerification(
    @Body() resendVerificationDto: ResendVerificationDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.resendVerification(resendVerificationDto);
  }

  @Post('/:id/update-profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Profile updated' })
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.updateProfile(userId, updateProfileDto);
  }

  @Post('/:id/change-password')
  @ApiOperation({ summary: 'Change user password' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'Password changed' })
  async changePassword(
    @Param('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.changePassword(userId, changePasswordDto);
  }

  @Post('/:id/deactivate')
  @ApiOperation({ summary: 'Deactivate user account' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  async deactivateUser(
    @Param('id') userId: string,
    @Body() deactivateUserDto: DeactivateUserDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.deactivateUser(userId, deactivateUserDto);
  }

  @Post('/:id/reactivate')
  @ApiOperation({ summary: 'Reactivate user account' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User reactivated' })
  async reactivateUser(
    @Param('id') userId: string,
    @Body() reactivateUserDto: ReactivateUserDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.reactivateUser(userId, reactivateUserDto);
  }
}
