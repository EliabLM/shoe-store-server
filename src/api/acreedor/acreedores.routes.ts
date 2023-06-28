import { Router } from 'express';
import { createCreditor } from '@api/acreedor/controllers';

export const creditorsRouter = Router();

// Crear acreedor
creditorsRouter.post('/create-creditor', createCreditor);
