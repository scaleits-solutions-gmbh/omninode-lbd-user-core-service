import { IsEmail, IsOptional, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'jane.new@example.com', maxLength: 255 })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
