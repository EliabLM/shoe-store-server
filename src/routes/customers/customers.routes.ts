import { Router } from 'express';

// Controllers
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  updateCustomer,
  updateCustomerState,
} from '@controllers/customers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createCustomerSchema,
  deleteCustomerSchema,
  readCustomersSchema,
  updateCustomerSchema,
  updateCustomerStateSchema,
} from './customers.schema';

export const customersRouter = Router();

// Create customer
customersRouter.post(
  '/create-customer',
  validatorHandler(createCustomerSchema, 'body'),
  createCustomer
);

// Read customers
customersRouter.get(
  '/get-customers',
  validatorHandler(readCustomersSchema, 'query'),
  getAllCustomers
);

// Update customer
customersRouter.put(
  '/update-customer',
  validatorHandler(updateCustomerSchema, 'body'),
  updateCustomer
);

// Delete customer
customersRouter.delete(
  '/delete-customer',
  validatorHandler(deleteCustomerSchema, 'query'),
  deleteCustomer
);

// Update customer state
customersRouter.patch(
  '/update-customer-state',
  validatorHandler(updateCustomerStateSchema, 'query'),
  updateCustomerState
);
