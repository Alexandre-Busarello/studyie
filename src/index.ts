import dotenv from 'dotenv';
dotenv.config();

import WebServer from './server';
import ConnectionDB from './database/connection';

ConnectionDB.create();
WebServer.setup().listen();
