import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for reactivating user operations
 */
export class ReactivateUserDto {
  @IsOptional()
  @IsString()
  reason?: string;

  @IsOptional()
  @IsString()
  reactivationNotes?: string;
}
