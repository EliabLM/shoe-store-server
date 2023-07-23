import { Router } from 'express';

// Controllers
import {
  createCreditor,
  deleteCreditor,
  disableCreditor,
  getCreditors,
  updateCreditor,
} from '@api/acreedor/controllers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createCreditorSchema } from './schemas.acreedores';

export const creditorsRouter = Router();

// Create creditor
creditorsRouter.post(
  '/create-creditor',
  validatorHandler(createCreditorSchema, 'body'),
  createCreditor
);

// Get creditors
creditorsRouter.get('/get-creditors', getCreditors);

// Disable creditor
creditorsRouter.put('/disable-creditor', disableCreditor);

// Update creditor
creditorsRouter.put('/update-creditor', updateCreditor);

// Delete creditor
creditorsRouter.delete('/delete-creditor', deleteCreditor);
