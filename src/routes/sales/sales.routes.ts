import { Router } from 'express';

// Controllers
import {
  cancelSale,
  createSale,
  getAllSales,
  getSalesByCustomer,
  getSalesByUser,
} from '@controllers/sales';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  cancelSaleSchema,
  createSaleSchema,
  getSalesByCustomerSchema,
  getSalesByUserSchema,
  readSales,
} from './sales.schema';

export const salesRouter = Router();

// Create sale
salesRouter.post(
  '/create-sale',
  validatorHandler(createSaleSchema, 'body'),
  createSale
);

// Get sales
salesRouter.get(
  '/get-sales',
  validatorHandler(readSales, 'query'),
  getAllSales
);

// Get sales by user
salesRouter.get(
  '/get-sales-by-user',
  validatorHandler(getSalesByUserSchema, 'query'),
  getSalesByUser
);

// Get sales by customer
salesRouter.get(
  '/get-sales-by-customer',
  validatorHandler(getSalesByCustomerSchema, 'query'),
  getSalesByCustomer
);

// Cancel sale
salesRouter.patch(
  '/cancel-sale',
  validatorHandler(cancelSaleSchema, 'query'),
  cancelSale
);
