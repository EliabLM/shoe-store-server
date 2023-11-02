import { Router } from 'express';

// Controllers
import { createPurchase } from '@controllers/purchases';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createPurchaseSchema } from './purchases.schema';

export const purchasesRouter = Router();

// Create purchase
purchasesRouter.post(
  '/create-purchase',
  validatorHandler(createPurchaseSchema, 'body'),
  createPurchase
);
