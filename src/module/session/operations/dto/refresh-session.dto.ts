import { IsString } from 'class-validator';

/**
 * DTO for session refresh operations
 */
export class RefreshSessionDto {
  @IsString()
  refreshToken: string;

  @IsString()
  sessionToken: string;
}
