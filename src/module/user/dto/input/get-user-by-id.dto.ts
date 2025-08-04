import { IsUUID } from 'class-validator';

export class GetUserByIdDto {
  @IsUUID('4', { message: 'User ID must be a valid UUID v4 format' })
  userId: string;
}
