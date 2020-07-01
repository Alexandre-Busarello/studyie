import express, { Application } from 'express';
// const mongoose = require("mongoose");
import cors from 'cors';

import routes from './routes';

class WebServer {
  server: Application;

  constructor() {
    this.server = express();
  }

  setup() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(routes);

    return this;
  }

  listen() {
    const port = process.env.PORT || '3000';
    this.server.listen(port, () => console.info(`Server ready and listening on port ${port}`));

    return this;
  }
}

export default new WebServer();
