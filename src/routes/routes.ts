import { Express, Router } from 'express';
import { usersRouter } from './users';
import { creditorsRouter } from './creditors';
import { creditsRouter } from './credits';
import { paymentsRouter } from './payments';
import { suppliersRouter } from './suppliers';
import { customersRouter } from './customers';
import { brandsRouter } from './brands';
import { locationsRouter } from './locations/locations.routes';
import { categoriesRouter } from './categories/categories.routes';
import { productsRouter } from './products';
import { salesRouter } from './sales';
import { purchasesRouter } from './purchases';
import { paymentMethodRouter } from './payment_methods';

const routerApi = (app: Express) => {
  const router = Router();

  app.use('/api/v1', router);

  router.use('/users', usersRouter);
  router.use('/creditors', creditorsRouter);
  router.use('/credits', creditsRouter);
  router.use('/payments', paymentsRouter);
  router.use('/suppliers', suppliersRouter);
  router.use('/customers', customersRouter);
  router.use('/brands', brandsRouter);
  router.use('/locations', locationsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/sales', salesRouter);
  router.use('/purchases', purchasesRouter);
  router.use('/payment-methods', paymentMethodRouter);
};

export default routerApi;
