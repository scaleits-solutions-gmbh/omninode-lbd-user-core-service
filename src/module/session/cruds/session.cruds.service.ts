import { Injectable, Logger } from '@nestjs/common';
import {
  SessionDao,
  GetSessionsColumn,
  Session,
} from '@scaleits-solutions-gmbh/omninode-lib-database-drizzle';
import {
  CustomParams,
  NestJsKit,
  buildCustomParamsFromQuery,
} from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';
import {
  PaginatedData,
  paginateExternalData,
} from '@scaleits-solutions-gmbh/org-lib-global-common-kit';
import { CreateSessionDto, UpdateSessionDto } from './dto/input';

/**
 * Service for managing basic session CRUD operations.
 *
 * This service handles all basic session database operations through SessionDao
 * and provides comprehensive error handling and logging for CRUD operations.
 */
@Injectable()
export class SessionCrudsService {
  private readonly logger = new Logger(SessionCrudsService.name);

  async getSessions(
    query: Record<string, string>,
  ): Promise<PaginatedData<Session>> {
    const startTime = Date.now();
    this.logger.debug(`Fetching sessions with query: ${JSON.stringify(query)}`);

    try {
      const result = buildCustomParamsFromQuery(
        query,
        SessionDao.cruds.getSessions.allowedFilterOptions,
        SessionDao.cruds.getSessions.allowedSortOptions,
        true,
        SessionDao.cruds.getSessions.maxPageSize,
      );

      if (!result.success) {
        this.logger.warn(
          `Invalid query parameters: ${JSON.stringify(result.errorDetails)}`,
        );
        throw new NestJsKit.NestJsBadRequestException(
          'Validation Failed',
          result.errorDetails,
        );
      }

      const customParams =
        result.customParams as CustomParams<GetSessionsColumn>;
      this.logger.debug(`Built custom params: ${JSON.stringify(customParams)}`);

      const [sessions, total] = await Promise.all([
        SessionDao.cruds.getSessions.fetch(customParams),
        SessionDao.cruds.getSessions.fetchCount(customParams),
      ]);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Retrieved ${sessions.length} sessions out of ${total} total in ${duration}ms`,
      );

      return paginateExternalData<Session>(
        sessions as unknown as Session[],
        total,
        customParams.paginationOption?.page ??
          SessionDao.cruds.getSessions.defaultParams.paginationOption.page,
        customParams.paginationOption?.limit ??
          SessionDao.cruds.getSessions.defaultParams.paginationOption.limit,
      );
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch sessions after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getSessionsCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching sessions count');

    try {
      const count = await SessionDao.cruds.getSessionsCount.fetch();
      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved sessions count: ${count} in ${duration}ms`);
      return { count };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch sessions count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getSessionById(sessionId: string): Promise<Session> {
    const startTime = Date.now();
    this.logger.debug(`Fetching session by ID: ${sessionId}`);

    try {
      const session = await SessionDao.cruds.getSessionById.fetch(sessionId);

      if (!session) {
        this.logger.warn(`Session not found with ID: ${sessionId}`);
        throw new NestJsKit.NestJsNotFoundException('Session not found', [
          {
            message: 'Session not found',
            code: 'SESSION_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully retrieved session ${sessionId} in ${duration}ms`,
      );
      return session;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch session ${sessionId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async createSession(createSessionDto: CreateSessionDto): Promise<Session> {
    const startTime = Date.now();
    this.logger.debug(
      `Creating new session: ${JSON.stringify(createSessionDto)}`,
    );

    try {
      const session =
        await SessionDao.cruds.createSession.create(createSessionDto);

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully created session with ID: ${session.id} in ${duration}ms`,
      );

      return session;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to create session after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async updateSession(
    sessionId: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const startTime = Date.now();
    this.logger.debug(
      `Updating session ${sessionId}: ${JSON.stringify(updateSessionDto)}`,
    );

    try {
      const session = await SessionDao.cruds.updateSession.update(
        sessionId,
        updateSessionDto,
      );

      if (!session) {
        this.logger.warn(`Session not found for update with ID: ${sessionId}`);
        throw new NestJsKit.NestJsNotFoundException('Session not found', [
          {
            message: 'Session not found',
            code: 'SESSION_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully updated session ${sessionId} in ${duration}ms`,
      );
      return session;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to update session ${sessionId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async deleteSession(sessionId: string): Promise<Session> {
    const startTime = Date.now();
    this.logger.debug(`Deleting session: ${sessionId}`);

    try {
      const session = await SessionDao.cruds.deleteSession.delete(sessionId);

      if (!session) {
        this.logger.warn(
          `Session not found for deletion with ID: ${sessionId}`,
        );
        throw new NestJsKit.NestJsNotFoundException('Session not found', [
          {
            message: 'Session not found',
            code: 'SESSION_NOT_FOUND',
          },
        ]);
      }

      const duration = Date.now() - startTime;
      this.logger.log(
        `Successfully deleted session ${sessionId} in ${duration}ms`,
      );
      return session;
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to delete session ${sessionId} after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
