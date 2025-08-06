import { Controller, Get, Query } from '@nestjs/common';
import { AuthCrudsService } from './auth.cruds.service';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling basic auth CRUD operations.
 *
 * Provides REST API endpoints for basic auth data retrieval:
 * - GET /auth/cruds/sessions - List auth sessions with pagination and filtering
 * - GET /auth/cruds/sessions/count - Get total auth sessions count
 */
@Controller('auth/cruds')
export class AuthCrudsController {
  constructor(private readonly authCrudsService: AuthCrudsService) {}

  @Get('/sessions')
  async getAuthSessions(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    return this.authCrudsService.getAuthSessions(query);
  }

  @Get('/sessions/count')
  async getAuthSessionsCount(): Promise<{ count: number }> {
    return this.authCrudsService.getAuthSessionsCount();
  }
}
