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
import { UserCompanyCrudsService } from './user-company.cruds.service';
import { CreateUserCompanyDto, UpdateUserCompanyDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { UserCompany } from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
@ApiTags('user-companies')
@Controller(`${lambdaConfig.custom.cutomPath}/cruds/user-companies`)
export class UserCompanyCrudsController {
  private readonly logger = new Logger(UserCompanyCrudsController.name);

  constructor(
    @Inject(UserCompanyCrudsService)
    private readonly userCompanyCrudsService: UserCompanyCrudsService,
  ) {
    this.logger.debug('UserCompanyCrudsController: Constructor');
  }

  @Get()
  @ApiOperation({ summary: 'List user-company relationships' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated user-company relationships' })
  async getUserCompanies(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<UserCompany>> {
    return this.userCompanyCrudsService.getUserCompanies(query);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get user-company relationships count' })
  @ApiResponse({ status: 200, description: 'Count of relationships' })
  async getUserCompaniesCount(): Promise<{ count: number }> {
    return this.userCompanyCrudsService.getUserCompaniesCount();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get user-company by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User-company found' })
  async getUserCompany(@Param('id') id: string): Promise<UserCompany> {
    return this.userCompanyCrudsService.getUserCompanyById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create user-company relationship' })
  @ApiResponse({ status: 201, description: 'User-company created' })
  async createUserCompany(
    @Body() createUserCompanyDto: CreateUserCompanyDto,
  ): Promise<UserCompany> {
    return this.userCompanyCrudsService.createUserCompany(createUserCompanyDto);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update user-company relationship' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User-company updated' })
  async updateUserCompany(
    @Param('id') id: string,
    @Body() updateUserCompanyDto: UpdateUserCompanyDto,
  ): Promise<UserCompany> {
    return this.userCompanyCrudsService.updateUserCompany(
      id,
      updateUserCompanyDto,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user-company relationship' })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'User-company deleted' })
  async deleteUserCompany(@Param('id') id: string): Promise<UserCompany> {
    return this.userCompanyCrudsService.deleteUserCompany(id);
  }
}
