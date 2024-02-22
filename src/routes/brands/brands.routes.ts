import { Router } from 'express';

// Controllers
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from '@controllers/brands';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createBrandSchema,
  deleteBrandSchema,
  readBrandsSchema,
  updateBrandSchema,
} from './brands.schema';

export const brandsRouter = Router();

// Create brand
brandsRouter.post(
  '/create-brand',
  validatorHandler(createBrandSchema, 'body'),
  createBrand
);

// Read brands
brandsRouter.get(
  '/get-brands',
  validatorHandler(readBrandsSchema, 'query'),
  getAllBrands
);

// Update brand
brandsRouter.put(
  '/update-brand',
  validatorHandler(updateBrandSchema, 'body'),
  updateBrand
);

// Delete brand
brandsRouter.delete(
  '/delete-brand',
  validatorHandler(deleteBrandSchema, 'query'),
  deleteBrand
);
