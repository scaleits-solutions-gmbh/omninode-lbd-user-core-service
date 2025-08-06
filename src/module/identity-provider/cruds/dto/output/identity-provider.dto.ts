import { z } from 'zod';
import {
  parseArrayOrThrowNestJsException,
  parseOrThrowNestJsException,
} from '@scaleits-solutions-gmbh/omninode-lib-backend-common-kit';

enum IdentityProviderType {
  LOCAL = 'local',
  MICROSOFT = 'microsoft',
}

export class IdentityProviderDtoUtils {
  static readonly identityProviderDtoSchema = z.object({
    id: z.string(),
    companyId: z.string(),
    name: z.string().nullable(),
    type: z.nativeEnum(IdentityProviderType),
    externalIdentityProviderId: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static readonly parseIdentityProviderDto = (identityProvider: unknown): IdentityProviderDto => {
    return parseOrThrowNestJsException(this.identityProviderDtoSchema, identityProvider);
  };

  static readonly parseIdentityProviderDtoList = (identityProviders: unknown[]): IdentityProviderDto[] => {
    return parseArrayOrThrowNestJsException(this.identityProviderDtoSchema, identityProviders);
  };
}

export type IdentityProviderDto = z.infer<typeof IdentityProviderDtoUtils.identityProviderDtoSchema>;
