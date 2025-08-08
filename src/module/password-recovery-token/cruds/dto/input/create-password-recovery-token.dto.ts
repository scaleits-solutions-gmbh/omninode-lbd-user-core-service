import { IsUUID, IsString, MaxLength, IsDate } from 'class-validator';

export class CreatePasswordRecoveryTokenDto {
  @IsUUID()
  userId: string;

  @IsString()
  @MaxLength(255)
  token: string;

  @IsDate()
  expiresAt: Date;
}
