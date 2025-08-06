import { IsString } from 'class-validator';

/**
 * DTO for validating recovery token operations
 */
export class ValidateTokenDto {
  @IsString()
  token: string;
}
