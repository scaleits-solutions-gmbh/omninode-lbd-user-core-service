/* eslint-disable @typescript-eslint/require-await */
import { Injectable, Logger } from '@nestjs/common';
import { PaginatedData } from '@scaleits-solutions-gmbh/org-lib-global-common-kit';

/**
 * Service for managing basic auth CRUD operations.
 *
 * This service handles basic auth data retrieval operations.
 * Note: Auth module primarily handles business logic, so CRUD operations are minimal.
 */
@Injectable()
export class AuthCrudsService {
  private readonly logger = new Logger(AuthCrudsService.name);

  async getAuthSessions(
    query: Record<string, string>,
  ): Promise<PaginatedData<any>> {
    const startTime = Date.now();
    this.logger.debug(
      `Fetching auth sessions with query: ${JSON.stringify(query)}`,
    );

    try {
      // TODO: Implement with SessionDao or AuthDao if needed
      // This is a minimal implementation as auth primarily handles business logic
      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved auth sessions in ${duration}ms`);

      return {
        data: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch auth sessions after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }

  async getAuthSessionsCount(): Promise<{ count: number }> {
    const startTime = Date.now();
    this.logger.debug('Fetching auth sessions count');

    try {
      // TODO: Implement with SessionDao or AuthDao if needed
      const duration = Date.now() - startTime;
      this.logger.log(`Retrieved auth sessions count in ${duration}ms`);
      return { count: 0 };
    } catch (error) {
      const duration = Date.now() - startTime;
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to fetch auth sessions count after ${duration}ms: ${errorMessage}`,
        errorStack,
      );
      throw error;
    }
  }
}
