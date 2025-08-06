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
import { SessionCrudsService } from './session.cruds.service';
import {
  SessionDto,
  CreateSessionDto,
  UpdateSessionDto,
  GetSessionByIdDto,
} from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Controller for handling basic session CRUD operations.
 *
 * Provides REST API endpoints for basic session data manipulation:
 * - GET /sessions/cruds - List sessions with pagination and filtering
 * - GET /sessions/cruds/count - Get total sessions count
 * - GET /sessions/cruds/:sessionId - Get session by ID
 * - POST /sessions/cruds - Create new session
 * - PUT /sessions/cruds/:sessionId - Update session
 * - DELETE /sessions/cruds/:sessionId - Delete session
 */
@Controller('sessions/cruds')
export class SessionCrudsController {
  constructor(private readonly sessionCrudsService: SessionCrudsService) {}

  @Get()
  async getSessions(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<SessionDto>> {
    return this.sessionCrudsService.getSessions(query);
  }

  @Get('/count')
  async getSessionsCount(): Promise<{ count: number }> {
    return this.sessionCrudsService.getSessionsCount();
  }

  @Get('/:sessionId')
  async getSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
  ): Promise<SessionDto> {
    return this.sessionCrudsService.getSessionById(getSessionByIdDto.sessionId);
  }

  @Post()
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionDto> {
    return this.sessionCrudsService.createSession(createSessionDto);
  }

  @Put('/:sessionId')
  async updateSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionDto> {
    return this.sessionCrudsService.updateSession(
      getSessionByIdDto.sessionId,
      updateSessionDto,
    );
  }

  @Delete('/:sessionId')
  async deleteSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
  ): Promise<SessionDto> {
    return this.sessionCrudsService.deleteSession(getSessionByIdDto.sessionId);
  }
}
