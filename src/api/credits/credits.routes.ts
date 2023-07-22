import { Router } from 'express';

// Controllers
import { createCredit } from '@api/credits/controllers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createCreditSchema } from './schemas.credits';

export const creditsRouter = Router();

// Crear acreedor
creditsRouter.post(
  '/create-credit',
  validatorHandler(createCreditSchema, 'body'),
  createCredit
);
