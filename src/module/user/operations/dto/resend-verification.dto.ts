import { IsEmail } from 'class-validator';

/**
 * DTO for resending email verification operations
 */
export class ResendVerificationDto {
  @IsEmail()
  email: string;
}
