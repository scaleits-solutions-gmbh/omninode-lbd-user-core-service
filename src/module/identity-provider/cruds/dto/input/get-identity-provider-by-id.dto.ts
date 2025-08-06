import { IsUUID } from 'class-validator';

export class GetIdentityProviderByIdDto {
  @IsUUID()
  id: string;
}
