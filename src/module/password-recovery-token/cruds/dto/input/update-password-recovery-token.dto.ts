import { IsUUID } from 'class-validator';

export class UpdatePasswordRecoveryTokenDto {
  @IsUUID()
  userId: string;
}
