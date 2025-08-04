import { IsEnum, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';
import { ManagementConsoleAccess } from '../output/user-company.dto';

export class CreateUserCompanyDto {
  @IsNotEmpty({ message: 'User ID is required' })
  @IsUUID('4', { message: 'User ID must be a valid UUID v4 format' })
  userId: string;

  @IsNotEmpty({ message: 'Company ID is required' })
  @IsUUID('4', { message: 'Company ID must be a valid UUID v4 format' })
  companyId: string;

  @IsEnum(ManagementConsoleAccess, {
    message:
      'Management console access must be a valid enum value. Valid values are: ' +
      Object.values(ManagementConsoleAccess).join(', '),
  })
  @IsOptional()
  managementConsoleAccess?: ManagementConsoleAccess =
    ManagementConsoleAccess.READ;
}
