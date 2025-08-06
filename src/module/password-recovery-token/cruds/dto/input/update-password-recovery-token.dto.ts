import {
  IsUUID,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UpdatePasswordRecoveryTokenDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  token?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsBoolean()
  used?: boolean;
}
