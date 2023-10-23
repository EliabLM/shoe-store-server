import { Router } from 'express';

// Controllers
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
} from '@controllers/suppliers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createSupplierSchema, updateSupplierSchema } from './suppliers.schema';

export const suppliersRouter = Router();

// Create creditor
suppliersRouter.post(
  '/create-supplier',
  validatorHandler(createSupplierSchema, 'body'),
  createSupplier
);

// Read suppliers
suppliersRouter.get('/get-suppliers', getAllSuppliers);

// Update supplier
suppliersRouter.put(
  '/update-supplier',
  validatorHandler(updateSupplierSchema, 'body'),
  updateSupplier
);

// Delete supplier
suppliersRouter.delete('/delete-supplier', deleteSupplier);