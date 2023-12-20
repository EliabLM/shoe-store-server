import { Router } from 'express';

// Controllers
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  updateSupplier,
  updateSupplierState,
} from '@controllers/suppliers';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createSupplierSchema,
  updateSupplierStateSchema,
  updateSupplierSchema,
  deleteSupplierSchema,
} from './suppliers.schema';

export const suppliersRouter = Router();

// Create supplier
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
suppliersRouter.delete(
  '/delete-supplier',
  validatorHandler(deleteSupplierSchema, 'query'),
  deleteSupplier
);

// Update supplier state
suppliersRouter.patch(
  '/update-supplier-state',
  validatorHandler(updateSupplierStateSchema, 'query'),
  updateSupplierState
);
