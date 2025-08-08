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
import { SessionCrudsService } from './session.cruds.service';
import { CreateSessionDto, UpdateSessionDto, GetSessionByIdDto } from './dto';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { Session } from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

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
@ApiTags('sessions')
@Controller(`${lambdaConfig.custom.cutomPath}/cruds/sessions`)
export class SessionCrudsController {
  private readonly logger = new Logger(SessionCrudsController.name);

  constructor(
    @Inject(SessionCrudsService)
    private readonly sessionCrudsService: SessionCrudsService,
  ) {
    this.logger.debug('SessionCrudsController: Constructor');
  }

  @Get()
  @ApiOperation({ summary: 'List sessions with pagination and filtering' })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Paginated sessions' })
  async getSessions(
    @Query() query: Record<string, string>,
  ): Promise<PaginatedData<Session>> {
    return this.sessionCrudsService.getSessions(query);
  }

  @Get('/count')
  @ApiOperation({ summary: 'Get sessions count' })
  @ApiResponse({ status: 200, description: 'Count of sessions' })
  async getSessionsCount(): Promise<{ count: number }> {
    return this.sessionCrudsService.getSessionsCount();
  }

  @Get('/:sessionId')
  @ApiOperation({ summary: 'Get session by id' })
  @ApiParam({ name: 'sessionId', required: true })
  @ApiResponse({ status: 200, description: 'Session found' })
  async getSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
  ): Promise<Session> {
    return this.sessionCrudsService.getSessionById(getSessionByIdDto.sessionId);
  }

  @Post()
  @ApiOperation({ summary: 'Create session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  async createSession(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    return this.sessionCrudsService.createSession(createSessionDto);
  }

  @Put('/:sessionId')
  @ApiOperation({ summary: 'Update session' })
  @ApiParam({ name: 'sessionId', required: true })
  @ApiResponse({ status: 200, description: 'Session updated' })
  async updateSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionCrudsService.updateSession(
      getSessionByIdDto.sessionId,
      updateSessionDto,
    );
  }

  @Delete('/:sessionId')
  @ApiOperation({ summary: 'Delete session' })
  @ApiParam({ name: 'sessionId', required: true })
  @ApiResponse({ status: 200, description: 'Session deleted' })
  async deleteSession(
    @Param() getSessionByIdDto: GetSessionByIdDto,
  ): Promise<Session> {
    return this.sessionCrudsService.deleteSession(getSessionByIdDto.sessionId);
  }
}
