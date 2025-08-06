import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UserCompanyOperationsService } from './user-company.operations.service';
import {
  AssignUserToCompanyDto,
  RemoveUserFromCompanyDto,
  ChangeUserRoleDto,
} from './dto';

/**
 * Controller for handling user-company business logic operations.
 *
 * Provides REST API endpoints for complex user-company operations:
 * - POST /user-companies/operations/assign - Assign user to company
 * - POST /user-companies/operations/:id/remove - Remove user from company
 * - POST /user-companies/operations/:id/change-role - Change user role in company
 * - GET /user-companies/operations/user/:userId/companies - Get all companies for user
 * - GET /user-companies/operations/company/:companyId/users - Get all users for company
 */
@Controller('user-companies/operations')
export class UserCompanyOperationsController {
  constructor(
    private readonly userCompanyOperationsService: UserCompanyOperationsService,
  ) {}

  @Post('/assign')
  async assignUserToCompany(
    @Body() assignUserToCompanyDto: AssignUserToCompanyDto,
  ): Promise<{ message: string; userCompanyId?: string }> {
    return this.userCompanyOperationsService.assignUserToCompany(
      assignUserToCompanyDto,
    );
  }

  @Post('/:id/remove')
  async removeUserFromCompany(
    @Param('id') userCompanyId: string,
    @Body() removeUserFromCompanyDto: RemoveUserFromCompanyDto,
  ): Promise<{ message: string }> {
    return this.userCompanyOperationsService.removeUserFromCompany(
      userCompanyId,
      removeUserFromCompanyDto,
    );
  }

  @Post('/:id/change-role')
  async changeUserRole(
    @Param('id') userCompanyId: string,
    @Body() changeUserRoleDto: ChangeUserRoleDto,
  ): Promise<{ message: string }> {
    return this.userCompanyOperationsService.changeUserRole(
      userCompanyId,
      changeUserRoleDto,
    );
  }

  @Get('/user/:userId/companies')
  async getAllCompaniesForUser(
    @Param('userId') userId: string,
  ): Promise<{ companies: any[]; count: number }> {
    return this.userCompanyOperationsService.getAllCompaniesForUser(userId);
  }

  @Get('/company/:companyId/users')
  async getAllUsersForCompany(
    @Param('companyId') companyId: string,
  ): Promise<{ users: any[]; count: number }> {
    return this.userCompanyOperationsService.getAllUsersForCompany(companyId);
  }
}
