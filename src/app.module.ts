import { Module } from '@nestjs/common';
import { UserModule } from './module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
