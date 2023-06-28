import { Express, Router } from 'express';
import { usersRouter } from '@api/usuarios';
import { creditorsRouter } from '@api/acreedor';

const routerApi = (app: Express) => {
  const router = Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/creditors', creditorsRouter);
};

export default routerApi;
