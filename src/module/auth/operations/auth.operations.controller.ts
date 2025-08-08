import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthOperationsService } from './auth.operations.service';
import {
  LoginDto,
  LogoutDto,
  RefreshTokenDto,
  VerifyTokenDto,
  RevokeTokenDto,
  ResetPasswordDto,
  ChangePasswordDto,
  EnableTwoFactorDto,
  DisableTwoFactorDto,
  VerifyTwoFactorDto,
} from './dto';
import lambdaConfig from 'lambda-config';

/**
 * Controller for handling auth business logic operations.
 *
 * Provides REST API endpoints for authentication and authorization operations:
 * - POST /auth/operations/login - User authentication
 * - POST /auth/operations/logout - User logout
 * - POST /auth/operations/refresh - Token refresh
 * - POST /auth/operations/verify-token - Token verification
 * - POST /auth/operations/revoke-token - Token revocation
 * - GET /auth/operations/me - Get current user info
 * - POST /auth/operations/reset-password - Password reset
 * - POST /auth/operations/change-password - Password change
 * - POST /auth/operations/enable-2fa - Enable two-factor authentication
 * - POST /auth/operations/disable-2fa - Disable two-factor authentication
 * - POST /auth/operations/verify-2fa - Verify two-factor authentication
 */
@ApiTags('auth-operations')
@Controller(`${lambdaConfig.custom.cutomPath}/operations/auth`)
export class AuthOperationsController {
  constructor(private readonly authOperationsService: AuthOperationsService) {}

  @Post('/login')
  @ApiOperation({ summary: 'User authentication' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() loginDto: LoginDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: any;
    expiresIn: number;
  }> {
    return this.authOperationsService.login(loginDto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Body() logoutDto: LogoutDto): Promise<{ message: string }> {
    return this.authOperationsService.logout(logoutDto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Token refresh' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    return this.authOperationsService.refresh(refreshTokenDto);
  }

  @Post('/verify-token')
  @ApiOperation({ summary: 'Token verification' })
  @ApiResponse({ status: 200, description: 'Verification result' })
  async verifyToken(@Body() verifyTokenDto: VerifyTokenDto): Promise<{
    valid: boolean;
    user?: any;
    expiresAt?: Date;
  }> {
    return this.authOperationsService.verifyToken(verifyTokenDto);
  }

  @Post('/revoke-token')
  @ApiOperation({ summary: 'Token revocation' })
  @ApiResponse({ status: 200, description: 'Token revoked' })
  async revokeToken(
    @Body() revokeTokenDto: RevokeTokenDto,
  ): Promise<{ message: string }> {
    return this.authOperationsService.revokeToken(revokeTokenDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'Get current user info' })
  @ApiResponse({ status: 200, description: 'Current user' })
  async getCurrentUser(): Promise<{ user: any }> {
    return this.authOperationsService.getCurrentUser();
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Password reset' })
  @ApiResponse({ status: 200, description: 'Password reset' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.authOperationsService.resetPassword(resetPasswordDto);
  }

  @Post('/change-password')
  @ApiOperation({ summary: 'Password change' })
  @ApiResponse({ status: 200, description: 'Password changed' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.authOperationsService.changePassword(changePasswordDto);
  }

  @Post('/enable-2fa')
  @ApiOperation({ summary: 'Enable two-factor authentication' })
  @ApiResponse({ status: 200, description: '2FA enabled' })
  async enableTwoFactor(
    @Body() enableTwoFactorDto: EnableTwoFactorDto,
  ): Promise<{
    qrCode: string;
    secret: string;
    backupCodes: string[];
  }> {
    return this.authOperationsService.enableTwoFactor(enableTwoFactorDto);
  }

  @Post('/disable-2fa')
  @ApiOperation({ summary: 'Disable two-factor authentication' })
  @ApiResponse({ status: 200, description: '2FA disabled' })
  async disableTwoFactor(
    @Body() disableTwoFactorDto: DisableTwoFactorDto,
  ): Promise<{ message: string }> {
    return this.authOperationsService.disableTwoFactor(disableTwoFactorDto);
  }

  @Post('/verify-2fa')
  @ApiOperation({ summary: 'Verify two-factor authentication' })
  @ApiResponse({ status: 200, description: '2FA verification result' })
  async verifyTwoFactor(
    @Body() verifyTwoFactorDto: VerifyTwoFactorDto,
  ): Promise<{ valid: boolean }> {
    return this.authOperationsService.verifyTwoFactor(verifyTwoFactorDto);
  }
}

/**
 * Controller for handling user-specific auth operations.
 *
 * Provides REST API endpoints for user account authentication management:
 * - GET /users/:userId/auth/operations/status - Get user auth status
 * - POST /users/:userId/auth/operations/disable - Disable user account
 * - POST /users/:userId/auth/operations/enable - Enable user account
 */
@Controller('users/:userId/auth/operations')
export class UserAuthOperationsController {
  constructor(private readonly authOperationsService: AuthOperationsService) {}

  @Get('/status')
  async getUserAuthStatus(@Param('userId') userId: string): Promise<{
    userId: string;
    isActive: boolean;
    lastLogin?: Date;
    failedAttempts: number;
    isLocked: boolean;
  }> {
    return this.authOperationsService.getUserAuthStatus(userId);
  }

  @Post('/disable')
  async disableUserAccount(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.authOperationsService.disableUserAccount(userId);
  }

  @Post('/enable')
  async enableUserAccount(
    @Param('userId') userId: string,
  ): Promise<{ message: string }> {
    return this.authOperationsService.enableUserAccount(userId);
  }
}
