import {
  IsEnum,
  IsString,
  IsEmail,
  IsOptional,
  MaxLength,
} from 'class-validator';
import {
  Theme,
  Language,
} from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @MaxLength(500, { message: 'Image URL cannot exceed 500 characters' })
  imageUrl?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email format' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'First name must be a string' })
  @MaxLength(255, { message: 'First name cannot exceed 255 characters' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Middle names must be a string' })
  @MaxLength(255, { message: 'Middle names cannot exceed 255 characters' })
  middleNames?: string;

  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(255, { message: 'Last name cannot exceed 255 characters' })
  lastName?: string;

  @IsOptional()
  @IsString({ message: 'Position must be a string' })
  @MaxLength(255, { message: 'Position cannot exceed 255 characters' })
  position?: string;

  @IsOptional()
  @IsEnum(Theme, {
    message:
      'Theme must be a valid enum value. Valid values are: ' +
      Object.values(Theme).join(', '),
  })
  theme?: Theme;

  @IsOptional()
  @IsEnum(Language, {
    message:
      'Language must be a valid enum value. Valid values are: ' +
      Object.values(Language).join(', '),
  })
  language?: Language;
}
