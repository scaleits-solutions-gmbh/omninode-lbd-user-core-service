import { IsString } from 'class-validator';

/**
 * DTO for token revocation operations
 */
export class RevokeTokenDto {
  @IsString()
  token: string;
}
