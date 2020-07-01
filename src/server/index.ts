import express, { Application } from 'express';
import cors from 'cors';

import mainRoutes from './routes';
import signInRoutes from 'authentication/sign-in/routes';
import signUpRoutes from 'authentication/sign-up/routes';

class WebServer {
  server: Application;

  constructor() {
    this.server = express();
  }

  setup() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(mainRoutes);
    this.server.use(signInRoutes);
    this.server.use(signUpRoutes);

    return this;
  }

  listen() {
    const port = process.env.PORT || '3000';
    this.server.listen(port, () => console.info(`Server ready and listening on port ${port}`));

    return this;
  }
}

export default new WebServer();
