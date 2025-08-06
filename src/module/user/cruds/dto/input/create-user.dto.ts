import {
  IsEmail,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
  IsDateString,
} from 'class-validator';
import {
  Theme,
  Language,
} from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(255)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  middleNames?: string;

  @IsString()
  @MaxLength(255)
  lastName: string;

  @IsString()
  @MaxLength(255)
  position: string;

  @IsEnum(Theme)
  theme: Theme;

  @IsEnum(Language)
  language: Language;

  @IsOptional()
  @IsDateString()
  lastSeenAt?: string;
}
