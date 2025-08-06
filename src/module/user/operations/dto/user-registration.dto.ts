import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

/**
 * DTO for user registration operations
 */
export class UserRegistrationDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  companyId?: string;
}
