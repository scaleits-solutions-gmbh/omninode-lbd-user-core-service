import { IsString } from 'class-validator';

/**
 * DTO for disabling two-factor authentication operations
 */
export class DisableTwoFactorDto {
  @IsString()
  password: string;

  @IsString()
  twoFactorCode: string;
}
