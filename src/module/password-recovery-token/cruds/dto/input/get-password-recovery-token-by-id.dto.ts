import { IsUUID } from 'class-validator';

export class GetPasswordRecoveryTokenByIdDto {
  @IsUUID()
  tokenId: string;
}
