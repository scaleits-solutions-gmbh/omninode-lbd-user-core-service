import { IsString, IsOptional, IsObject } from 'class-validator';

/**
 * DTO for linking user to identity provider operations
 */
export class LinkUserToProviderDto {
  @IsString()
  providerId: string;

  @IsString()
  externalUserId: string;

  @IsOptional()
  @IsObject()
  providerUserData?: Record<string, any>;

  @IsOptional()
  @IsString()
  linkType?: string;
}
