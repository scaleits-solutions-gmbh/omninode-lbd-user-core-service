import { IsString, IsOptional, IsEnum } from 'class-validator';

/**
 * Management console access levels
 */
export enum ManagementConsoleAccess {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

/**
 * DTO for assigning user to company operations
 */
export class AssignUserToCompanyDto {
  @IsString()
  userId: string;

  @IsString()
  companyId: string;

  @IsOptional()
  @IsEnum(ManagementConsoleAccess)
  managementConsoleAccess?: ManagementConsoleAccess;

  @IsOptional()
  @IsString()
  assignmentReason?: string;

  @IsOptional()
  @IsString()
  assignmentNotes?: string;
}
