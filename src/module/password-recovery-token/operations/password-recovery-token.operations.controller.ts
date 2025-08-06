import { Controller, Post, Body } from '@nestjs/common';
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
@Controller('password-recovery/operations')
export class PasswordRecoveryTokenOperationsController {
  constructor(
    private readonly passwordRecoveryTokenOperationsService: PasswordRecoveryTokenOperationsService,
  ) {}

  @Post('/request')
  async requestPasswordRecovery(
    @Body() requestPasswordRecoveryDto: RequestPasswordRecoveryDto,
  ): Promise<{ message: string; tokenId?: string }> {
    return this.passwordRecoveryTokenOperationsService.requestPasswordRecovery(
      requestPasswordRecoveryDto,
    );
  }

  @Post('/reset')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    return this.passwordRecoveryTokenOperationsService.resetPassword(
      resetPasswordDto,
    );
  }

  @Post('/validate-token')
  async validateToken(
    @Body() validateTokenDto: ValidateTokenDto,
  ): Promise<{ message: string; isValid: boolean; expiresAt?: Date }> {
    return this.passwordRecoveryTokenOperationsService.validateToken(
      validateTokenDto,
    );
  }

  @Post('/resend')
  async resendRecoveryEmail(
    @Body() resendRecoveryEmailDto: ResendRecoveryEmailDto,
  ): Promise<{ message: string }> {
    return this.passwordRecoveryOperationsService.resendRecoveryEmail(
      resendRecoveryEmailDto,
    );
  }
}
