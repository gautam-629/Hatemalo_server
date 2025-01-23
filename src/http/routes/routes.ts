import { Express, Router } from 'express';
import { userRouter } from './user.routes';
import { authRouter } from './auth.routes';
import { photoRouter } from './photo.routes';

export default (app: Express): void => {
  const router = Router();
  userRouter(router);
  authRouter(router);
  photoRouter(router)
  app.use('/api/v1', router);
};
