import { IsString } from 'class-validator';

/**
 * DTO for verifying two-factor authentication operations
 */
export class VerifyTwoFactorDto {
  @IsString()
  code: string;
}
