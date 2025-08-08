import { IsUUID, IsBoolean, IsDate } from 'class-validator';

export class CreateSessionDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  identityProviderId: string;

  @IsBoolean()
  isActive: boolean;

  @IsDate()
  expiresAt: Date;
}
