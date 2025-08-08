import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import * as path from 'path';
import { readdirSync } from 'fs';

dotenv.config();

const logger = new Logger("lambdaConfig");

const STAGE = process.env.STAGE || 'local';
logger.debug(`STAGE: ${STAGE}`);

const routeName = 'acmp-domain';
const apiVersion = 'v1';
const cutomPath = STAGE === 'local' ? `/${routeName}/${apiVersion}` : '/';
logger.debug(`cutomPath: ${cutomPath}`);

// -------------- auto generation of events --------------
const eventsDir = `${__dirname}`; // or the path where your .events.ts are
const events: any[] = [];

// Scan all files that end with .events.ts (or .js after build)
readdirSync(eventsDir)
  .filter(file => file.startsWith('events.') && file.endsWith('.ts'))
  .forEach(file => {
    const modPath = path.join(eventsDir, file);
    // require supports .js and .ts (with ts-node or after build)
    const fnModule = require(modPath);
    if (typeof fnModule.events === 'function') {
      events.push(...fnModule.events(cutomPath, STAGE));
    } else {
      logger.warn(`Module ${file} does not export an 'events' function`);
    }
  });
// -------------------------------------------------

export default {
  custom: {
    apiVersion,
    routeName,
    cutomPath,
    commonPackageLayerName: 'layerOmninodePackages',
    commonPackageLayerVersion: 1,
    serviceName: `lambda-${routeName}`,
    functions: {
      api: {
        handler: 'src/main.handler',
        description: `Handle ${routeName} methods`,
        events,
      },
    },
  },
};