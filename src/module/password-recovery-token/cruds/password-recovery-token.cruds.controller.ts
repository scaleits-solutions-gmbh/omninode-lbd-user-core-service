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
import lambdaConfig from '../../../../lambda-config';
import { Logger, Inject } from '@nestjs/common';
import { PasswordRecoveryTokenCrudsService } from './password-recovery-token.cruds.service';
import {
  CreatePasswordRecoveryTokenDto,
  UpdatePasswordRecoveryTokenDto,
  GetPasswordRecoveryTokenByIdDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { PasswordRecoveryToken } from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
@ApiTags('password-recovery')
@Controller(`${lambdaConfig.custom.cutomPath}/cruds/password-recovery`)
export class PasswordRecoveryTokenCrudsController {
  private readonly logger = new Logger(
    PasswordRecoveryTokenCrudsController.name,
  );

  constructor(
    @Inject(PasswordRecoveryTokenCrudsService)
    private readonly passwordRecoveryTokenCrudsService: PasswordRecoveryTokenCrudsService,
  ) {
    this.logger.debug('PasswordRecoveryTokenCrudsController: Constructor');
  }

  @Get()
  @ApiOperation({ summary: 'List password recovery tokens' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated password recovery tokens' })
  async getPasswordRecoveryTokens(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<PasswordRecoveryToken>> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokens(
      query,
    );
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get password recovery tokens count' })
  @ApiResponse({ status: 200, description: 'Count of tokens' })
  async getPasswordRecoveryTokensCount(): Promise<{ count: number }> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokensCount();
  }

  @Get('/:tokenId')
  @ApiOperation({ summary: 'Get password recovery token by id' })
  @ApiParam({ name: 'tokenId', required: true })
  @ApiResponse({ status: 200, description: 'Token found' })
  async getPasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
  ): Promise<PasswordRecoveryToken> {
    return this.passwordRecoveryTokenCrudsService.getPasswordRecoveryTokenById(
      getPasswordRecoveryTokenByIdDto.tokenId,
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create password recovery token' })
  @ApiResponse({ status: 201, description: 'Token created' })
  async createPasswordRecoveryToken(
    @Body() createPasswordRecoveryTokenDto: CreatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryToken> {
    return this.passwordRecoveryTokenCrudsService.createPasswordRecoveryToken(
      createPasswordRecoveryTokenDto,
    );
  }

  @Put('/:tokenId')
  @ApiOperation({ summary: 'Update password recovery token' })
  @ApiParam({ name: 'tokenId', required: true })
  @ApiResponse({ status: 200, description: 'Token updated' })
  async updatePasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
    @Body() updatePasswordRecoveryTokenDto: UpdatePasswordRecoveryTokenDto,
  ): Promise<PasswordRecoveryToken> {
    return this.passwordRecoveryTokenCrudsService.updatePasswordRecoveryToken(
      getPasswordRecoveryTokenByIdDto.tokenId,
      updatePasswordRecoveryTokenDto,
    );
  }

  @Delete('/:tokenId')
  @ApiOperation({ summary: 'Delete password recovery token' })
  @ApiParam({ name: 'tokenId', required: true })
  @ApiResponse({ status: 200, description: 'Token deleted' })
  async deletePasswordRecoveryToken(
    @Param() getPasswordRecoveryTokenByIdDto: GetPasswordRecoveryTokenByIdDto,
  ): Promise<PasswordRecoveryToken> {
    return this.passwordRecoveryTokenCrudsService.deletePasswordRecoveryToken(
      getPasswordRecoveryTokenByIdDto.tokenId,
    );
  }
}
