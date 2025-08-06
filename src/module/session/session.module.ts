import { Module } from '@nestjs/common';
import { SessionCrudsController } from './cruds/session.cruds.controller';
import { SessionCrudsService } from './cruds/session.cruds.service';
import { SessionOperationsController } from './operations/session.operations.controller';
import { SessionOperationsService } from './operations/session.operations.service';

@Module({
  controllers: [SessionCrudsController, SessionOperationsController],
  providers: [SessionCrudsService, SessionOperationsService],
  exports: [SessionCrudsService, SessionOperationsService],
})
export class SessionModule {}
