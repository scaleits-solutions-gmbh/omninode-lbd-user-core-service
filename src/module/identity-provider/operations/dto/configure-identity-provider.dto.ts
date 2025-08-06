import {
  IsString,
  IsOptional,
  IsEnum,
  IsObject,
  IsBoolean,
} from 'class-validator';

/**
 * Identity provider types
 */
export enum IdentityProviderType {
  SAML = 'SAML',
  OAUTH2 = 'OAUTH2',
  OIDC = 'OIDC',
  LDAP = 'LDAP',
  ACTIVE_DIRECTORY = 'ACTIVE_DIRECTORY',
}

/**
 * DTO for configuring identity provider operations
 */
export class ConfigureIdentityProviderDto {
  @IsString()
  name: string;

  @IsEnum(IdentityProviderType)
  type: IdentityProviderType;

  @IsString()
  description: string;

  @IsObject()
  configuration: Record<string, any>;

  @IsOptional()
  @IsObject()
  attributeMapping?: Record<string, string>;

  @IsOptional()
  @IsBoolean()
  autoCreateUsers?: boolean;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;

  @IsOptional()
  @IsString()
  logoUrl?: string;
}
