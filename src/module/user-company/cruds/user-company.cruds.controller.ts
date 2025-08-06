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
import { UserCompanyCrudsService } from './user-company.cruds.service';
import {
  UserCompanyDto,
  CreateUserCompanyDto,
  UpdateUserCompanyDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling basic user-company relationship CRUD operations.
 *
 * Provides REST API endpoints for basic user-company data manipulation:
 * - GET /user-companies/cruds - List user-company relationships with pagination and filtering
 * - GET /user-companies/cruds/count - Get total user-company relationships count
 * - GET /user-companies/cruds/:id - Get user-company relationship by ID
 * - POST /user-companies/cruds - Create new user-company relationship
 * - PUT /user-companies/cruds/:id - Update user-company relationship
 * - DELETE /user-companies/cruds/:id - Delete user-company relationship
 */
@Controller('user-companies/cruds')
export class UserCompanyCrudsController {
  constructor(
    private readonly userCompanyCrudsService: UserCompanyCrudsService,
  ) {}

  @Get()
  async getUserCompanies(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<UserCompanyDto>> {
    return this.userCompanyCrudsService.getUserCompanies(query);
  }

  @Get('/count')
  async getUserCompaniesCount(): Promise<{ count: number }> {
    return this.userCompanyCrudsService.getUserCompaniesCount();
  }

  @Get('/:id')
  async getUserCompany(@Param('id') id: string): Promise<UserCompanyDto> {
    return this.userCompanyCrudsService.getUserCompanyById(id);
  }

  @Post()
  async createUserCompany(
    @Body() createUserCompanyDto: CreateUserCompanyDto,
  ): Promise<UserCompanyDto> {
    return this.userCompanyCrudsService.createUserCompany(createUserCompanyDto);
  }

  @Put('/:id')
  async updateUserCompany(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<UserCompanyDto> {
    return this.userCompanyCrudsService.updateUserCompany(
      id,
      updateUserCompanyDto,
    );
  }

  @Delete('/:id')
  async deleteUserCompany(@Param('id') id: string): Promise<UserCompanyDto> {
    return this.userCompanyCrudsService.deleteUserCompany(id);
  }
}
