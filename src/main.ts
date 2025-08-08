/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import lambdaConfig from '../lambda-config';
import { NestJsKit } from '@scaleits-solutions-gmbh/org-lib-backend-common-kit';

let cachedServer: Handler;

dotenv.config();

async function bootstrapServer(): Promise<Handler> {
  if (!cachedServer) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    const app = await NestFactory.create(AppModule, adapter);

    app.useGlobalPipes(new NestJsKit.CustomValidationPipe());
    app.useGlobalFilters(new NestJsKit.GlobalExceptionFilter());

    // Swagger JSON only
    const config = new DocumentBuilder()
      .setTitle('User Core Service')
      .setVersion(lambdaConfig.custom.apiVersion)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    const path = `${lambdaConfig.custom.cutomPath}/docs-json`;
    // Expose only raw JSON (no Swagger UI)
    (expressApp as any).get(path, (_req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });

    await app.init();
    cachedServer = serverlessExpress({ app: expressApp });
    console.log('Server initialized.');
  }
  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!event.path) {
    event.path = '/';
  }

  const server = await bootstrapServer();
  return server(event, context, callback);
};
