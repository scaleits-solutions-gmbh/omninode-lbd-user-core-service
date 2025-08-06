import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for unlinking user from identity provider operations
 */
export class UnlinkUserFromProviderDto {
  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
