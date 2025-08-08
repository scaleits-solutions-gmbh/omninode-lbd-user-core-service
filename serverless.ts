// serverless.ts
import * as dotenv from 'dotenv';
import type { AWS } from '@serverless/typescript';
import LambdaConfig from './lambda-config';

dotenv.config();

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Define o stage via variável de ambiente ou padrão 'local'
const stage = process.env.STAGE || 'local';

const serverlessConfiguration: AWS = {
  service: LambdaConfig.custom.serviceName,
  frameworkVersion: '^4.12.0',
  ...(stage === 'local' && { useDotenv: true }),

  plugins: [
    'serverless-offline',
  ],

  custom: {
    'serverless-offline': {
      noPrependStageInUrl: true,
    },
  },

  // desabilita o bundling builtin do Serverless v4 para evitar conflito
  build: {
    esbuild: false
  },

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    region: 'us-east-1',
    environment: {
      STAGE: stage,
      ...(stage === 'local'
        ? {
            NODE_ENV: getEnvVar('NODE_ENV'),
            DB_HOST: getEnvVar('DB_HOST'),
            DB_PORT: getEnvVar('DB_PORT'),
            DB_USERNAME: getEnvVar('DB_USER'),
            DB_PASSWORD: getEnvVar('DB_PASSWORD'),
            DB_NAME: getEnvVar('DB_NAME'),
            DB_SCHEMA: getEnvVar('DB_SCHEMA'),
          }
        : {}),
    },
  },

  functions: LambdaConfig.custom.functions,
};

export default serverlessConfiguration; 