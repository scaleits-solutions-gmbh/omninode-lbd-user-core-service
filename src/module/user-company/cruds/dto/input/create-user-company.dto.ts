import { IsUUID, IsEnum } from 'class-validator';

enum ManagementConsoleAccess {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
  NONE = 'none',
}

export class CreateUserCompanyDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  companyId: string;

  @IsEnum(ManagementConsoleAccess)
  managementConsoleAccess: ManagementConsoleAccess;
}
