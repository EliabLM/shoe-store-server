import { Express, Router } from 'express';
import { usersRouter } from '@api/usuarios';

const routerApi = (app: Express) => {
  const router = Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
};

export default routerApi;
