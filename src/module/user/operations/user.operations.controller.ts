import { Controller, Post, Param, Body } from '@nestjs/common';
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
@Controller('users/operations')
export class UserOperationsController {
  constructor(private readonly userOperationsService: UserOperationsService) {}

  @Post('/register')
  async registerUser(
    @Body() userRegistrationDto: UserRegistrationDto,
  ): Promise<{ message: string; userId?: string }> {
    return this.userOperationsService.registerUser(userRegistrationDto);
  }

  @Post('/verify-email')
  async verifyEmail(
    @Body() emailVerificationDto: EmailVerificationDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.verifyEmail(emailVerificationDto);
  }

  @Post('/resend-verification')
  async resendVerification(
    @Body() resendVerificationDto: ResendVerificationDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.resendVerification(resendVerificationDto);
  }

  @Post('/:id/update-profile')
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.updateProfile(userId, updateProfileDto);
  }

  @Post('/:id/change-password')
  async changePassword(
    @Param('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.changePassword(userId, changePasswordDto);
  }

  @Post('/:id/deactivate')
  async deactivateUser(
    @Param('id') userId: string,
    @Body() deactivateUserDto: DeactivateUserDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.deactivateUser(userId, deactivateUserDto);
  }

  @Post('/:id/reactivate')
  async reactivateUser(
    @Param('id') userId: string,
    @Body() reactivateUserDto: ReactivateUserDto,
  ): Promise<{ message: string }> {
    return this.userOperationsService.reactivateUser(userId, reactivateUserDto);
  }
}
