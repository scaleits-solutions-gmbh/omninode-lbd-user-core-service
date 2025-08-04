import {
  Theme,
  Language,
} from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';
import { z } from 'zod';
import {
  parseArrayOrThrowNestJsException,
  parseOrThrowNestJsException,
} from '@scaleits-solutions-gmbh/omninode-lib-backend-common-kit';

/**
 * Utility class for parsing and validating UserDto objects.
 *
 * Provides methods for parsing individual user objects and arrays of users,
 * with comprehensive validation using Zod schemas.
 */
export class UserDtoUtils {
  static readonly userDtoSchema = z.object({
    id: z.string(),
    imageUrl: z.string().nullable(),
    email: z.string().email(),
    firstName: z.string(),
    middleNames: z.string().nullable(),
    lastName: z.string(),
    position: z.string(),
    theme: z.nativeEnum(Theme),
    language: z.nativeEnum(Language),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static readonly parseUserDto = (user: unknown): UserDto => {
    return parseOrThrowNestJsException(this.userDtoSchema, user);
  };

  static readonly parseUserDtoList = (users: unknown[]): UserDto[] => {
    return parseArrayOrThrowNestJsException(this.userDtoSchema, users);
  };
}

export type UserDto = z.infer<typeof UserDtoUtils.userDtoSchema>;
