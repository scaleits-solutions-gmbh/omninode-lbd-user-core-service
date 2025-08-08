import { Controller, Post, Body, Logger, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
import lambdaConfig from '../../../../lambda-config';

@ApiTags('sessions-operations')
@Controller(`${lambdaConfig.custom.cutomPath}/operations/sessions`)
export class SessionOperationsController {
  private readonly logger = new Logger(SessionOperationsController.name);

  constructor(
    @Inject(SessionOperationsService)
    private readonly sessionOperationsService: SessionOperationsService,
  ) {
    this.logger.debug('SessionOperationsController: Constructor');
  }

  @Post('/login')
  @ApiOperation({ summary: 'User login and session creation' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(@Body() loginDto: LoginDto): Promise<{
    message: string;
    sessionToken?: string;
    refreshToken?: string;
  }> {
    return this.sessionOperationsService.login(loginDto);
  }

  @Post('/logout')
  @ApiOperation({ summary: 'User logout and session termination' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Body() logoutDto: LogoutDto): Promise<{ message: string }> {
    return this.sessionOperationsService.logout(logoutDto);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh session token' })
  @ApiResponse({ status: 200, description: 'Token refreshed' })
  async refreshSession(
    @Body() refreshSessionDto: RefreshSessionDto,
  ): Promise<{ message: string; sessionToken?: string }> {
    return this.sessionOperationsService.refreshSession(refreshSessionDto);
  }

  @Post('/validate')
  @ApiOperation({ summary: 'Validate session token' })
  @ApiResponse({ status: 200, description: 'Validation result' })
  async validateSession(
    @Body() validateSessionDto: ValidateSessionDto,
  ): Promise<{ message: string; isValid: boolean; userId?: string }> {
    return this.sessionOperationsService.validateSession(validateSessionDto);
  }

  @Post('/revoke-all')
  @ApiOperation({ summary: 'Revoke all user sessions' })
  @ApiResponse({ status: 200, description: 'Revoke successful' })
  async revokeAllSessions(
    @Body() revokeAllSessionsDto: RevokeAllSessionsDto,
  ): Promise<{ message: string; revokedCount: number }> {
    return this.sessionOperationsService.revokeAllSessions(
      revokeAllSessionsDto,
    );
  }
}
