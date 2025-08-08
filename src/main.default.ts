import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestJsKit } from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new NestJsKit.CustomValidationPipe());
  app.useGlobalFilters(new NestJsKit.GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
