import { Module } from '@nestjs/common';
import { UserModule } from './module';
import { UserCompanyModule } from './module';
import { SessionModule } from './module';
import { IdentityProviderModule } from './module';
import { PasswordRecoveryModule } from './module';
import { AuthModule } from './module';

@Module({
  imports: [
    UserModule,
    UserCompanyModule,
    SessionModule,
    IdentityProviderModule,
    PasswordRecoveryModule,
    AuthModule,
  ],
})
export class AppModule {}
