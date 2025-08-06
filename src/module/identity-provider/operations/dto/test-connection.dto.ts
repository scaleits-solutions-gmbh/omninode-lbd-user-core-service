import { IsOptional, IsObject } from 'class-validator';

/**
 * DTO for testing identity provider connection operations
 */
export class TestConnectionDto {
  @IsOptional()
  @IsObject()
  testCredentials?: Record<string, any>;

  @IsOptional()
  @IsObject()
  testConfiguration?: Record<string, any>;
}
