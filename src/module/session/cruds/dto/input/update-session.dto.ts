import { IsUUID, IsOptional } from 'class-validator';

export class UpdateSessionDto {
  @IsOptional()
  @IsUUID()
  userId?: string;
}
