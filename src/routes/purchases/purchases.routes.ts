import { Router } from 'express';

// Controllers
import {
  cancelPurchase,
  createPurchase,
  getAllPurchases,
  getPurchasesBySupplier,
  getPurchasesDetail,
} from '@controllers/purchases';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  cancelPurchaseSchema,
  createPurchaseSchema,
  getPurchasesBySupplierSchema,
} from './purchases.schema';

export const purchasesRouter = Router();

// Create purchase
purchasesRouter.post(
  '/create-purchase',
  validatorHandler(createPurchaseSchema, 'body'),
  createPurchase
);

// Read purchases
purchasesRouter.get('/get-purchases', getAllPurchases);

// Get purchases by supplier id
purchasesRouter.get(
  '/get-purchases-by-supplier',
  validatorHandler(getPurchasesBySupplierSchema, 'query'),
  getPurchasesBySupplier
);

// Get purchases detail
purchasesRouter.get(
  '/get-purchases-detail',
  validatorHandler(cancelPurchaseSchema, 'query'),
  getPurchasesDetail
);

// Cancel purchase
purchasesRouter.patch(
  '/cancel-purchase',
  validatorHandler(cancelPurchaseSchema, 'query'),
  cancelPurchase
);
