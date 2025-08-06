import { IsString, IsOptional } from 'class-validator';

/**
 * DTO for removing user from company operations
 */
export class RemoveUserFromCompanyDto {
  @IsOptional()
  @IsString()
  removalReason?: string;

  @IsOptional()
  @IsString()
  removalNotes?: string;
}
