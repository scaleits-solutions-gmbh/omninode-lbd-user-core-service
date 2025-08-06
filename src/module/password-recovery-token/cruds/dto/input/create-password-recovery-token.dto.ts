import {
  IsUUID,
  IsString,
  IsDateString,
  IsBoolean,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreatePasswordRecoveryTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  @MaxLength(255)
  token: string;

  @IsDateString()
  expiresAt: string;

  @IsOptional()
  @IsBoolean()
  used?: boolean;
}
