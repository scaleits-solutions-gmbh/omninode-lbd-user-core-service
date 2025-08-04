import {
  IsEnum,
  IsString,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsOptional,
} from 'class-validator';
import {
  Theme,
  Language,
} from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

export class CreateUserDto {
  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  @MaxLength(500, { message: 'Image URL cannot exceed 500 characters' })
  imageUrl?: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email format' })
  @MaxLength(255, { message: 'Email cannot exceed 255 characters' })
  email: string;

  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  @MaxLength(255, { message: 'First name cannot exceed 255 characters' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'Middle names must be a string' })
  @MaxLength(255, { message: 'Middle names cannot exceed 255 characters' })
  middleNames?: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  @MaxLength(255, { message: 'Last name cannot exceed 255 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Position is required' })
  @IsString({ message: 'Position must be a string' })
  @MaxLength(255, { message: 'Position cannot exceed 255 characters' })
  position: string;

  @IsNotEmpty({ message: 'Theme is required' })
  @IsEnum(Theme, {
    message:
      'Theme must be a valid enum value. Valid values are: ' +
      Object.values(Theme).join(', '),
  })
  theme: Theme;

  @IsNotEmpty({ message: 'Language is required' })
  @IsEnum(Language, {
    message:
      'Language must be a valid enum value. Valid values are: ' +
      Object.values(Language).join(', '),
  })
  language: Language;
}
