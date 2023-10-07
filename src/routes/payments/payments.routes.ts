import { Router } from 'express';

// Controllers
import { createPayment } from '@controllers/payments';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createPaymentSchema } from './payments.schema';

export const paymentsRouter = Router();

// Create payment
paymentsRouter.post(
  '/create-payment',
  validatorHandler(createPaymentSchema, 'body'),
  createPayment
);
