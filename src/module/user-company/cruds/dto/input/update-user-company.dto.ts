import { IsUUID, IsEnum, IsOptional } from 'class-validator';

enum ManagementConsoleAccess {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
  NONE = 'none',
}

export class UpdateUserCompanyDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string;

  @IsOptional()
  @IsEnum(ManagementConsoleAccess)
  managementConsoleAccess?: ManagementConsoleAccess;
}
