import { IsString } from 'class-validator';

/**
 * DTO for enabling two-factor authentication operations
 */
export class EnableTwoFactorDto {
  @IsString()
  password: string;
}
