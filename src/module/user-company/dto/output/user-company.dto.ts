import { z } from 'zod';
import {
  parseArrayOrThrowNestJsException,
  parseOrThrowNestJsException,
} from '@scaleits-solutions-gmbh/omninode-lib-backend-common-kit';

export enum ManagementConsoleAccess {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

export class UserCompanyDtoUtils {
  static readonly userCompanyDtoSchema = z.object({
    id: z.string(),
    userId: z.string(),
    companyId: z.string(),
    managementConsoleAccess: z.enum(ManagementConsoleAccess),
    createdAt: z.date(),
    updatedAt: z.date(),
  });

  static readonly parseUserCompanyDto = (
    userCompany: unknown,
  ): UserCompanyDto => {
    return parseOrThrowNestJsException(this.userCompanyDtoSchema, userCompany);
  };

  static readonly parseUserCompanyDtoList = (
    userCompanies: unknown[],
  ): UserCompanyDto[] => {
    return parseArrayOrThrowNestJsException(
      this.userCompanyDtoSchema,
      userCompanies,
    );
  };
}

export type UserCompanyDto = z.infer<
  typeof UserCompanyDtoUtils.userCompanyDtoSchema
>;
