import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  userId: string;
}
