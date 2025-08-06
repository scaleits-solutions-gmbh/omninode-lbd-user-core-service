import { IsString } from 'class-validator';

/**
 * DTO for session validation operations
 */
export class ValidateSessionDto {
  @IsString()
  sessionToken: string;
}
