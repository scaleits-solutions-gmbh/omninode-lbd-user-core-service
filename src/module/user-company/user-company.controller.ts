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
import { UserCompanyService } from './user-company.service';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

@Controller('users/:userId/companies')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Get()
  async getUserCompanies(
    @Param('userId') userId: string,
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.userCompanyService.getUserCompanies(userId, query);
  }

  @Post()
  async addUserToCompany(
    @Param('userId') userId: string,
    @Body() createUserCompanyDto: any,
  ): Promise<any> {
    return this.userCompanyService.addUserToCompany(userId, createUserCompanyDto);
  }

  @Get('/:companyId')
  async getUserCompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
  ): Promise<any> {
    return this.userCompanyService.getUserCompany(userId, companyId);
  }

  @Put('/:companyId')
  async updateUserCompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
    @Body() updateUserCompanyDto: any,
  ): Promise<any> {
    return this.userCompanyService.updateUserCompany(
      userId,
      companyId,
      updateUserCompanyDto,
    );
  }

  @Delete('/:companyId')
  async removeUserFromCompany(
    @Param('userId') userId: string,
    @Param('companyId') companyId: string,
  ): Promise<any> {
    return this.userCompanyService.removeUserFromCompany(userId, companyId);
  }
} 