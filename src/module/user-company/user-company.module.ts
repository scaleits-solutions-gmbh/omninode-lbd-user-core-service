import { Module } from '@nestjs/common';
import { UserCompanyCrudsController } from './cruds/user-company.cruds.controller';
import { UserCompanyCrudsService } from './cruds/user-company.cruds.service';
import { UserCompanyOperationsController } from './operations/user-company.operations.controller';
import { UserCompanyOperationsService } from './operations/user-company.operations.service';

@Module({
  controllers: [UserCompanyCrudsController, UserCompanyOperationsController],
  providers: [UserCompanyCrudsService, UserCompanyOperationsService],
  exports: [UserCompanyCrudsService, UserCompanyOperationsService],
})
export class UserCompanyModule {}
