import {
  IsUUID,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  identityProviderId: string;

  @IsDateString()
  expiresAt: string;

  @IsBoolean()
  isActive: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  deviceInfo?: string;

  @IsOptional()
  @IsString()
  @MaxLength(45)
  ipAddress?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  userAgent?: string;

  @IsOptional()
  @IsDateString()
  lastActivityAt?: string;
}
