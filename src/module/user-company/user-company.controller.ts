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
import {
  UserCompanyDto,
  CreateUserCompanyDto,
  UpdateUserCompanyDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling user-company relationship HTTP requests.
 *
 * Provides REST API endpoints for user-company relationship CRUD operations including:
 * - GET /user-companies - List user-company relationships with pagination and filtering
 * - GET /user-companies/count - Get total user-company relationships count
 * - GET /user-companies/:id - Get user-company relationship by ID
 * - POST /user-companies - Create new user-company relationship
 * - PUT /user-companies/:id - Update user-company relationship
 * - DELETE /user-companies/:id - Delete user-company relationship
 */
@Controller('user-companies')
export class UserCompanyController {
  constructor(private readonly userCompanyService: UserCompanyService) {}

  @Get()
  async getUserCompanies(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<UserCompanyDto>> {
    return this.userCompanyService.getUserCompanies(query);
  }

  @Get('/count')
  async getUserCompaniesCount(): Promise<{ count: number }> {
    return this.userCompanyService.getUserCompaniesCount();
  }

  @Get('/:id')
  async getUserCompany(@Param('id') id: string): Promise<UserCompanyDto> {
    return this.userCompanyService.getUserCompanyById(id);
  }

  @Post()
  async createUserCompany(
    @Body() createUserCompanyDto: CreateUserCompanyDto,
  ): Promise<UserCompanyDto> {
    return this.userCompanyService.createUserCompany(createUserCompanyDto);
  }

  @Put('/:id')
  async updateUserCompany(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<UserCompanyDto> {
    return this.userCompanyService.updateUserCompany(id, updateUserCompanyDto);
  }

  @Delete('/:id')
  async deleteUserCompany(@Param('id') id: string): Promise<UserCompanyDto> {
    return this.userCompanyService.deleteUserCompany(id);
  }
}
