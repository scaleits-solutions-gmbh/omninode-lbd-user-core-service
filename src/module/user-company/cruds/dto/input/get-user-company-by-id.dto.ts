import { IsUUID } from 'class-validator';

export class GetUserCompanyByIdDto {
  @IsUUID()
  userCompanyId: string;
}
