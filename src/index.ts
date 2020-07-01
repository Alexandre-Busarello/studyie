import dotenv from 'dotenv';
dotenv.config();

if (!process.env.IS_TS_NODE) {
  // tslint:disable-next-line:no-var-requires
  require('module-alias/register');
}

import WebServer from './server';
import ConnectionDB from './database/connection';

ConnectionDB.create();
WebServer.setup().listen();
