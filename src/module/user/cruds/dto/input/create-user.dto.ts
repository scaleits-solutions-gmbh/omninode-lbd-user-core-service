import { IsEmail, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  Theme,
  Language,
} from '@scaleits-solutions-gmbh/omninode-lib-global-common-kit';

export class CreateUserDto {
  @ApiProperty({ example: 'jane.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Jane' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'Engineer' })
  @IsString()
  position: string;

  @ApiProperty({ enum: Theme })
  @IsEnum(Theme)
  theme: string;

  @ApiProperty({ enum: Language })
  @IsEnum(Language)
  language: string;
}
