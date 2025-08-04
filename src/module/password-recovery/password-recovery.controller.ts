import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('/request')
  async requestPasswordRecovery(@Body() requestDto: any): Promise<any> {
    return this.passwordRecoveryService.requestPasswordRecovery(requestDto);
  }

  @Post('/reset')
  async resetPassword(@Body() resetDto: any): Promise<any> {
    return this.passwordRecoveryService.resetPassword(resetDto);
  }

  @Get('/validate/:token')
  async validateToken(@Param('token') token: string): Promise<any> {
    return this.passwordRecoveryService.validateToken(token);
  }
}

@Controller('users/:userId/password-recovery')
export class UserPasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Get()
  async getUserRecoveryTokens(
    @Param('userId') userId: string,
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.passwordRecoveryService.getUserRecoveryTokens(userId, query);
  }

  @Delete('/:tokenId')
  async deleteRecoveryToken(
    @Param('userId') userId: string,
    @Param('tokenId') tokenId: string,
  ): Promise<any> {
    return this.passwordRecoveryService.deleteRecoveryToken(userId, tokenId);
  }
}
