import { Router } from 'express';

// Controllers
import {
  createPayment,
  getAllPayments,
  getPaymentsByCreditId,
} from '@controllers/payments';

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

paymentsRouter.get('/get-payments', getAllPayments);

paymentsRouter.get('/get-payments-by-credit-id', getPaymentsByCreditId);
