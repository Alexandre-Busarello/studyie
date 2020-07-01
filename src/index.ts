import dotenv from 'dotenv';
dotenv.config();

import WebServer from './server';

WebServer.setup().listen();
