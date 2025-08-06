import { z } from 'zod';
import {
  parseArrayOrThrowNestJsException,
  parseOrThrowNestJsException,
} from '@scaleits-solutions-gmbh/omninode-lib-backend-common-kit';

export class SessionDtoUtils {
  static readonly sessionDtoSchema = z.object({
    id: z.string(),
    userId: z.string(),
    identityProviderId: z.string(),
    expiresAt: z.date(),
    isActive: z.boolean(),
    deviceInfo: z.string().nullable(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    lastActivityAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static readonly parseSessionDto = (session: unknown): SessionDto => {
    return parseOrThrowNestJsException(this.sessionDtoSchema, session);
  };

  static readonly parseSessionDtoList = (sessions: unknown[]): SessionDto[] => {
    return parseArrayOrThrowNestJsException(this.sessionDtoSchema, sessions);
  };
}

export type SessionDto = z.infer<typeof SessionDtoUtils.sessionDtoSchema>;
