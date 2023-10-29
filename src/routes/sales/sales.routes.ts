import { Router } from 'express';

// Controllers
import {
  cancelSale,
  createSale,
  getAllSales,
  getSalesByCustomer,
  getSalesByUser,
  getSalesDetail,
} from '@controllers/sales';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  cancelSaleSchema,
  createSaleSchema,
  getSalesByCustomerSchema,
  getSalesByUserSchema,
} from './sales.schema';

export const salesRouter = Router();

// Create sale
salesRouter.post(
  '/create-sale',
  validatorHandler(createSaleSchema, 'body'),
  createSale
);

// Read sales
salesRouter.get('/get-sales', getAllSales);

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

// Get sales detail
salesRouter.get(
  '/get-sales-detail',
  validatorHandler(cancelSaleSchema, 'query'),
  getSalesDetail
);

// Cancel sale
salesRouter.patch(
  '/cancel-sale',
  validatorHandler(cancelSaleSchema, 'query'),
  cancelSale
);
