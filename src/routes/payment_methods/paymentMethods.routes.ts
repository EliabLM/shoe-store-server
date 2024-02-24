import { Router } from 'express';

// Controllers
import {
  createPaymentMethod,
  deletePaymentMethod,
  getAllPaymentMethods,
  updatePaymentMethod,
} from '@controllers/payment_methods';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createPaymentMethodSchema,
  deletePaymentMethodSchema,
  readPaymentMethodsSchema,
  updatePaymentMethodSchema,
} from './paymentMethods.schema';

export const paymentMethodRouter = Router();

// Create brand
paymentMethodRouter.post(
  '/create-payment-method',
  validatorHandler(createPaymentMethodSchema, 'body'),
  createPaymentMethod
);

// Read brands
paymentMethodRouter.get(
  '/get-payment-methods',
  validatorHandler(readPaymentMethodsSchema, 'query'),
  getAllPaymentMethods
);

// Update brand
paymentMethodRouter.put(
  '/update-payment-method',
  validatorHandler(updatePaymentMethodSchema, 'body'),
  updatePaymentMethod
);

// Delete brand
paymentMethodRouter.delete(
  '/delete-payment-method',
  validatorHandler(deletePaymentMethodSchema, 'query'),
  deletePaymentMethod
);
