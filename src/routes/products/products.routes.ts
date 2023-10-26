import { Router } from 'express';

// Controllers
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '@controllers/products';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import { createProductSchema, updateProductSchema } from './products.schema';

export const productsRouter = Router();

// Create product
productsRouter.post(
  '/create-product',
  validatorHandler(createProductSchema, 'body'),
  createProduct
);

// Read products
productsRouter.get('/get-products', getAllProducts);

// Update product
productsRouter.put(
  '/update-product',
  validatorHandler(updateProductSchema, 'body'),
  updateProduct
);

// Delete product
productsRouter.delete('/delete-product', deleteProduct);
