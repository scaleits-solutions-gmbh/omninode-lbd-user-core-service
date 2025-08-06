import { IsString, IsOptional, IsBoolean } from 'class-validator';

/**
 * DTO for disabling identity provider operations
 */
export class DisableIdentityProviderDto {
  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsBoolean()
  invalidateExistingSessions?: boolean;

  @IsOptional()
  @IsString()
  disableNotes?: string;
}
