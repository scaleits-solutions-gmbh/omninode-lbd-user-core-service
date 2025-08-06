import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * DTO for requesting password recovery operations
 */
export class RequestPasswordRecoveryDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  redirectUrl?: string;

  @IsOptional()
  @IsString()
  clientInfo?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
