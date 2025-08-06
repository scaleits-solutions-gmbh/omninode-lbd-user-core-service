import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for deactivating user operations
 */
export class DeactivateUserDto {
  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  deactivationNotes?: string;
}
