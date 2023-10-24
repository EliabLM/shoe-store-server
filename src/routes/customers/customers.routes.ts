import { Router } from 'express';

// Controllers
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
} from '@controllers/customers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createCustomerSchema, updateCustomerSchema } from './customers.schema';

export const customersRouter = Router();

// Create customer
customersRouter.post(
  '/create-customer',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomer
);

// Read customers
customersRouter.get('/get-customers', getAllCustomers);

// Update customer
customersRouter.put(
  '/update-customer',
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomer
);

// Delete customer
customersRouter.delete('/delete-customer', deleteCustomer);
