import { Router } from 'express';

// Controllers
import { createCreditor, getCreditors } from '@api/acreedor/controllers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createCreditorSchema } from './schemas.acreedores';

export const creditorsRouter = Router();

// Crear acreedor
creditorsRouter.post(
  '/create-creditor',
  validatorHandler(createCreditorSchema, 'body'),
  createCreditor
);

// Obtener acreedores
creditorsRouter.get('/get-creditors', getCreditors);
