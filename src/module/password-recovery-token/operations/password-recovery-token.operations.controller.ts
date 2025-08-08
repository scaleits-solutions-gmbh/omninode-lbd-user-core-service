import { Controller, Post, Body, Logger, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import lambdaConfig from '../../../../lambda-config';
import { PasswordRecoveryTokenOperationsService } from './password-recovery-token.operations.service';
import {
  RequestPasswordRecoveryDto,
  ResetPasswordDto,
  ValidateTokenDto,
  ResendRecoveryEmailDto,
} from './dto';

/**
 * Controller for handling password recovery business logic operations.
 *
 * Provides REST API endpoints for complex password recovery operations:
 * - POST /password-recovery/operations/request - Request password recovery
 * - POST /password-recovery/operations/reset - Reset password with token
 * - POST /password-recovery/operations/validate-token - Validate recovery token
 * - POST /password-recovery/operations/resend - Resend recovery email
 */
@ApiTags('password-recovery-operations')
@Controller(`${lambdaConfig.custom.cutomPath}/operations/password-recovery`)
export class PasswordRecoveryTokenOperationsController {
  private readonly logger = new Logger(
    PasswordRecoveryTokenOperationsController.name,
  );

  constructor(
    @Inject(PasswordRecoveryTokenOperationsService)
    private readonly passwordRecoveryTokenOperationsService: PasswordRecoveryTokenOperationsService,
  ) {
    this.logger.debug('PasswordRecoveryTokenOperationsController: Constructor');
  }

  @Post('/request')
  @ApiOperation({ summary: 'Request password recovery' })
  @ApiResponse({ status: 200, description: 'Recovery requested' })
  async requestPasswordRecovery(
    @Body() requestPasswordRecoveryDto: RequestPasswordRecoveryDto,
  ): Promise<{ message: string; tokenId?: string }> {
    return this.passwordRecoveryTokenOperationsService.requestPasswordRecovery(
      requestPasswordRecoveryDto,
    );
  }

  @Post('/reset')
  @ApiOperation({ summary: 'Reset password using token' })
  @ApiResponse({ status: 200, description: 'Password reset' })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.passwordRecoveryTokenOperationsService.resetPassword(
      resetPasswordDto,
    );
  }

  @Post('/validate-token')
  @ApiOperation({ summary: 'Validate recovery token' })
  @ApiResponse({ status: 200, description: 'Token validation result' })
  async validateToken(
    @Body() validateTokenDto: ValidateTokenDto,
  ): Promise<{ message: string; isValid: boolean; expiresAt?: Date }> {
    return this.passwordRecoveryTokenOperationsService.validateToken(
      validateTokenDto,
    );
  }

  @Post('/resend')
  @ApiOperation({ summary: 'Resend recovery email' })
  @ApiResponse({ status: 200, description: 'Recovery email resent' })
  async resendRecoveryEmail(
    @Body() resendRecoveryEmailDto: ResendRecoveryEmailDto,
  ): Promise<{ message: string }> {
    return this.passwordRecoveryTokenOperationsService.resendRecoveryEmail(
      resendRecoveryEmailDto,
    );
  }
}
