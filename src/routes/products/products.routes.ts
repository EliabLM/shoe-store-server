import { Router } from 'express';

// Controllers
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductState,
} from '@controllers/products';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createProductSchema,
  deleteProductSchema,
  readProductsSchema,
  updateProductSchema,
  updateProductStateSchema,
} from './products.schema';

export const productsRouter = Router();

// Create product
productsRouter.post(
  '/create-product',
  validatorHandler(createProductSchema, 'body'),
  createProduct
);

// Read products
productsRouter.get(
  '/get-products',
  validatorHandler(readProductsSchema, 'query'),
  getAllProducts
);

// Update product
productsRouter.put(
  '/update-product',
  validatorHandler(updateProductSchema, 'body'),
  updateProduct
);

// Delete product
productsRouter.delete(
  '/delete-product',
  validatorHandler(deleteProductSchema, 'query'),
  deleteProduct
);

// Update producto state
productsRouter.patch(
  '/update-product-state',
  validatorHandler(updateProductStateSchema, 'query'),
  updateProductState
);
