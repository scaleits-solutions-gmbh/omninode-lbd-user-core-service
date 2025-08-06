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
import { PasswordRecoveryTokenCrudsService } from './password-recovery-token.cruds.service';
import {
  PasswordRecoveryTokenDto,
  CreatePasswordRecoveryTokenDto,
  UpdatePasswordRecoveryTokenDto,
  GetPasswordRecoveryTokenByIdDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling basic password recovery token CRUD operations.
 *
 * Provides REST API endpoints for basic password recovery token data manipulation:
 * - GET /password-recovery/cruds - List password recovery tokens with pagination and filtering
 * - GET /password-recovery/cruds/count - Get total password recovery tokens count
 * - GET /password-recovery/cruds/:tokenId - Get password recovery token by ID
 * - POST /password-recovery/cruds - Create new password recovery token
 * - PUT /password-recovery/cruds/:tokenId - Update password recovery token
 * - DELETE /password-recovery/cruds/:tokenId - Delete password recovery token
 */
@Controller('password-recovery/cruds')
export class PasswordRecoveryTokenCrudsController {
  constructor(
    private readonly passwordRecoveryTokenCrudsService: PasswordRecoveryTokenCrudsService,
  ) {}

  @Get()
  async getPasswordRecoveryTokens(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<PasswordRecoveryTokenDto>> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokens(query);
  }

  @Get('/count')
  async getPasswordRecoveryTokensCount(): Promise<{ count: number }> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokensCount();
  }

  @Get('/:tokenId')
  async getPasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
  ): Promise<PasswordRecoveryTokenDto> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokenById(
      getPasswordRecoveryTokenByIdDto.tokenId,
    );
  }

  @Post()
  async createPasswordRecoveryToken(
    @Body() createPasswordRecoveryTokenDto: CreatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryTokenDto> {
    return this.passwordRecoveryTokenCrudsService.createPasswordRecoveryToken(
      createPasswordRecoveryTokenDto,
    );
  }

  @Put('/:tokenId')
  async updatePasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
    @Body() updatePasswordRecoveryTokenDto: UpdatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryTokenDto> {
    return this.passwordRecoveryTokenCrudsService.updatePasswordRecoveryToken(
      getPasswordRecoveryTokenByIdDto.tokenId,
      updatePasswordRecoveryTokenDto,
    );
  }

  @Delete('/:tokenId')
  async deletePasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
  ): Promise<PasswordRecoveryTokenDto> {
    return this.passwordRecoveryTokenCrudsService.deletePasswordRecoveryToken(
      getPasswordRecoveryTokenByIdDto.tokenId,
    );
  }
}
