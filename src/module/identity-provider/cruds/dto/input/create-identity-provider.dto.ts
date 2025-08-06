import {
  IsUUID,
  IsString,
  IsOptional,
  MaxLength,
  IsEnum,
} from 'class-validator';

enum IdentityProviderType {
  LOCAL = 'local',
  MICROSOFT = 'microsoft',
}

export class CreateIdentityProviderDto {
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsEnum(IdentityProviderType)
  type: IdentityProviderType;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  externalIdentityProviderId?: string;
}
