import { IsString } from 'class-validator';

/**
 * DTO for token refresh operations
 */
export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
