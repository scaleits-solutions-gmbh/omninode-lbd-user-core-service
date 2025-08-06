import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for revoking all sessions operations
 */
export class RevokeAllSessionsDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  excludeSessionId?: string;
}
