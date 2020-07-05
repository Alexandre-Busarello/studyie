import express, { Application } from 'express';
import cors from 'cors';

import mainRoutes from './routes';
import signInRoutes from '@app/authentication/sign-in/routes';
import signUpRoutes from '@app/authentication/sign-up/routes';
import userRoutes from '@app/authentication/user/routes';

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
    this.server.use(userRoutes);

    return this;
  }

  listen() {
    const port = process.env.PORT || '4000';
    this.server.listen(port, () => console.info(`Server ready and listening on port ${port}`));

    return this;
  }
}

export default new WebServer();
