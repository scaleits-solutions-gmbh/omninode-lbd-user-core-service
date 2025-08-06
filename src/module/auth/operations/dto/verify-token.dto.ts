import { IsString } from 'class-validator';

/**
 * DTO for token verification operations
 */
export class VerifyTokenDto {
  @IsString()
  token: string;
}
