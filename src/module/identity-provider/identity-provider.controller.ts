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
import { IdentityProviderService } from './identity-provider.service';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

@Controller('identity-providers')
export class IdentityProviderController {
  constructor(private readonly identityProviderService: IdentityProviderService) {}

  @Get()
  async getIdentityProviders(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.identityProviderService.getIdentityProviders(query);
  }

  @Get('/:id')
  async getIdentityProvider(@Param('id') id: string): Promise<any> {
    return this.identityProviderService.getIdentityProvider(id);
  }

  @Post()
  async createIdentityProvider(@Body() createIdentityProviderDto: any): Promise<any> {
    return this.identityProviderService.createIdentityProvider(createIdentityProviderDto);
  }

  @Put('/:id')
  async updateIdentityProvider(
    @Param('id') id: string,
    @Body() updateIdentityProviderDto: any,
  ): Promise<any> {
    return this.identityProviderService.updateIdentityProvider(id, updateIdentityProviderDto);
  }

  @Delete('/:id')
  async deleteIdentityProvider(@Param('id') id: string): Promise<any> {
    return this.identityProviderService.deleteIdentityProvider(id);
  }
}

@Controller('users/:userId/identity-providers')
export class UserIdentityProviderController {
  constructor(private readonly identityProviderService: IdentityProviderService) {}

  @Get()
  async getUserIdentityProviders(
    @Param('userId') userId: string,
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.identityProviderService.getUserIdentityProviders(userId, query);
  }

  @Post()
  async linkUserToIdentityProvider(
    @Param('userId') userId: string,
    @Body() linkUserDto: any,
  ): Promise<any> {
    return this.identityProviderService.linkUserToIdentityProvider(userId, linkUserDto);
  }

  @Delete('/:providerId')
  async unlinkUserFromIdentityProvider(
    @Param('userId') userId: string,
    @Param('providerId') providerId: string,
  ): Promise<any> {
    return this.identityProviderService.unlinkUserFromIdentityProvider(userId, providerId);
  }
} 