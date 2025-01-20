import { Express, Router } from 'express';
import { userRouter } from './user.routes';

export default (app: Express): void => {
  const router = Router();
  userRouter(router);

  app.use('/api/v1', router);
};
