import { IsEmail, IsOptional, IsString } from 'class-validator';

/**
 * DTO for resending recovery email operations
 */
export class ResendRecoveryEmailDto {
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  redirectUrl?: string;
}
