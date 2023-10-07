import { Express, Router } from 'express';
import { usersRouter } from './users';
import { creditorsRouter } from './creditors';
import { creditsRouter } from './credits';

const routerApi = (app: Express) => {
  const router = Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/creditors', creditorsRouter);
  router.use('/credits', creditsRouter);
};

export default routerApi;
