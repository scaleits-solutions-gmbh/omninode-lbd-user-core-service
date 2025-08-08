import { IsEnum, IsOptional, IsString } from 'class-validator';

/**
 * Management console access levels
 */
export enum ChangeRoleManagementConsoleAccess {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

/**
 * DTO for changing user role in company operations
 */
export class ChangeUserRoleDto {
  @IsEnum(ChangeRoleManagementConsoleAccess)
  newManagementConsoleAccess: ChangeRoleManagementConsoleAccess;

  @IsOptional()
  @IsString()
  roleChangeReason?: string;

  @IsOptional()
  @IsString()
  roleChangeNotes?: string;
}
