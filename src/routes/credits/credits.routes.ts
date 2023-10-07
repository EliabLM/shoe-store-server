import { Router } from 'express';

// Controllers
import {
  createCredit,
  getAllCredits,
  getCreditsByCreditorId,
  updateCredit,
} from '@controllers/credits';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createCreditSchema, updateCreditSchema } from './credits.schema';

export const creditsRouter = Router();

// Create creditor
creditsRouter.post(
  '/create-credit',
  validatorHandler(createCreditSchema, 'body'),
  createCredit
);

// Get credits by creditor id
creditsRouter.get('/get-credits-by-id', getCreditsByCreditorId);

// Get all credits
creditsRouter.get('/get-credits', getAllCredits);

// Update credit
creditsRouter.put(
  '/update-credit',
  validatorHandler(updateCreditSchema, 'body'),
  updateCredit
);
