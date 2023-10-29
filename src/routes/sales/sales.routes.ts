import { Router } from 'express';

// Controllers
import {
  createSale,
  getAllSales,
  getSalesByCustomer,
  getSalesByUser,
} from '@controllers/sales';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
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

// Update sale

// Delete sale

// ###########################################

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
