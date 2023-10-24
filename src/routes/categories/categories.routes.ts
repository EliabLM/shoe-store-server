import { Router } from 'express';

// Controllers
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from '@controllers/categories';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createCategorySchema,
  updateCategorySchema,
} from './categories.schema';

export const categoriesRouter = Router();

// Create category
categoriesRouter.post(
  '/create-category',
  validatorHandler(createCategorySchema, 'body'),
  createCategory
);

// Read categories
categoriesRouter.get('/get-categories', getAllCategories);

// Update category
categoriesRouter.put(
  '/update-category',
  validatorHandler(updateCategorySchema, 'body'),
  updateCategory
);

// Delete category
categoriesRouter.delete('/delete-category', deleteCategory);
