import { Module } from '@nestjs/common';
import { AuthOperationsController } from './operations/auth.operations.controller';
import { AuthOperationsService } from './operations/auth.operations.service';

@Module({
  controllers: [AuthOperationsController],
  providers: [AuthOperationsService],
  exports: [AuthOperationsService],
})
export class AuthModule {}
