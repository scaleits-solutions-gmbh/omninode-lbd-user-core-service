import { IsUUID } from 'class-validator';

export class GetSessionByIdDto {
  @IsUUID()
  sessionId: string;
}
