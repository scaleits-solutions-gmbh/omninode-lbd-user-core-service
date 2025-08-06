import { IsOptional, IsBoolean, IsArray, IsString } from 'class-validator';

/**
 * DTO for syncing users from identity provider operations
 */
export class SyncUsersDto {
  @IsOptional()
  @IsBoolean()
  fullSync?: boolean;

  @IsOptional()
  @IsBoolean()
  dryRun?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userFilters?: string[];

  @IsOptional()
  @IsBoolean()
  updateExistingUsers?: boolean;

  @IsOptional()
  @IsBoolean()
  createNewUsers?: boolean;
}
