import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

/**
 * DTO for user login operations
 */
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  twoFactorCode?: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;

  @IsOptional()
  @IsString()
  deviceId?: string;
}
