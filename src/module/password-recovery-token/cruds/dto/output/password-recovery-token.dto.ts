import { z } from 'zod';
import {
  parseArrayOrThrowNestJsException,
  parseOrThrowNestJsException,
} from '@scaleits-solutions-gmbh/omninode-lib-backend-common-kit';

export class PasswordRecoveryTokenDtoUtils {
  static readonly passwordRecoveryTokenDtoSchema = z.object({
    id: z.string(),
    userId: z.string(),
    token: z.string(),
    expiresAt: z.date(),
    used: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static readonly parsePasswordRecoveryTokenDto = (passwordRecoveryToken: unknown): PasswordRecoveryTokenDto => {
    return parseOrThrowNestJsException(this.passwordRecoveryTokenDtoSchema, passwordRecoveryToken);
  };

  static readonly parsePasswordRecoveryTokenDtoList = (passwordRecoveryTokens: unknown[]): PasswordRecoveryTokenDto[] => {
    return parseArrayOrThrowNestJsException(this.passwordRecoveryTokenDtoSchema, passwordRecoveryTokens);
  };
}

export type PasswordRecoveryTokenDto = z.infer<typeof PasswordRecoveryTokenDtoUtils.passwordRecoveryTokenDtoSchema>;
