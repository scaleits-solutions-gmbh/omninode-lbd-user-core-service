import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for user logout operations
 */
export class LogoutDto {
  @IsString()
  sessionToken: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  logoutReason?: string;
}
