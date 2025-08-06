import { IsString, MinLength } from 'class-validator';

/**
 * DTO for password reset operations
 */
export class ResetPasswordDto {
  @IsString()
  resetToken: string;

  @IsString()
  @MinLength(8)
  newPassword: string;

  @IsString()
  confirmPassword: string;
}
