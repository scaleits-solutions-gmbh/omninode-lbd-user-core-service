import { IsString, IsEmail } from 'class-validator';

/**
 * DTO for email verification operations
 */
export class EmailVerificationDto {
  @IsEmail()
  email: string;

  @IsString()
  verificationToken: string;
}
