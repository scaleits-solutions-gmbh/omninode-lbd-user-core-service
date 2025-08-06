import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for user logout operations
 */
export class LogoutDto {
  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  refreshToken?: string;

  @IsOptional()
  @IsString()
  deviceId?: string;
}
