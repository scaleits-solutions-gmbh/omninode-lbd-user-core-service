import { Controller, Post, Body } from '@nestjs/common';
import { SessionOperationsService } from './session.operations.service';
import {
  LoginDto,
  LogoutDto,
  RefreshSessionDto,
  ValidateSessionDto,
  RevokeAllSessionsDto,
} from './dto';

/**
 * Controller for handling session business logic operations.
 *
 * Provides REST API endpoints for complex session operations:
 * - POST /sessions/operations/login - User login and session creation
 * - POST /sessions/operations/logout - User logout and session termination
 * - POST /sessions/operations/refresh - Refresh session token
 * - POST /sessions/operations/validate - Validate session token
 * - POST /sessions/operations/revoke-all - Revoke all user sessions
 */
@Controller('sessions/operations')
export class SessionOperationsController {
  constructor(
    private readonly sessionOperationsService: SessionOperationsService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{
    message: string;
    sessionToken?: string;
    refreshToken?: string;
  }> {
    return this.sessionOperationsService.login(loginDto);
  }

  @Post('/logout')
  async logout(@Body() logoutDto: LogoutDto): Promise<{ message: string }> {
    return this.sessionOperationsService.logout(logoutDto);
  }

  @Post('/refresh')
  async refreshSession(
    @Body() refreshSessionDto: RefreshSessionDto,
  ): Promise<{ message: string; sessionToken?: string }> {
    return this.sessionOperationsService.refreshSession(refreshSessionDto);
  }

  @Post('/validate')
  async validateSession(
    @Body() validateSessionDto: ValidateSessionDto,
  ): Promise<{ message: string; isValid: boolean; userId?: string }> {
    return this.sessionOperationsService.validateSession(validateSessionDto);
  }

  @Post('/revoke-all')
  async revokeAllSessions(
    @Body() revokeAllSessionsDto: RevokeAllSessionsDto,
  ): Promise<{ message: string; revokedCount: number }> {
    return this.sessionOperationsService.revokeAllSessions(
      revokeAllSessionsDto,
    );
  }
}
