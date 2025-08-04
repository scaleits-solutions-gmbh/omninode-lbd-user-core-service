import { IsEnum, IsOptional } from 'class-validator';
import { ManagementConsoleAccess } from '../output/user-company.dto';

export class UpdateUserCompanyDto {
  @IsEnum(ManagementConsoleAccess, {
    message:
      'Management console access must be a valid enum value. Valid values are: ' +
      Object.values(ManagementConsoleAccess).join(', '),
  })
  @IsOptional()
  managementConsoleAccess?: ManagementConsoleAccess;
}
