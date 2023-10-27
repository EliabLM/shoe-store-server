import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Product from '@models/products/Product.model';
import Brand from '@models/brands/Brand.model';
import Category from '@models/categories/Category.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { brand, categories } = req.body;

    const brandExists = await Brand.findById(brand);
    if (!brandExists) throw boom.notFound('No existe la marca');

    const validCategories = [];
    for (const id of categories) {
      const categoryExists = await Category.findById(id);
      if (categoryExists) {
        validCategories.push(id);
      }
    }

    if (validCategories.length <= 0)
      throw boom.badRequest('No existen las categorías ingresadas');

    const product = new Product({ ...req.body, categories: validCategories });

    const storedProduct = await product.save();

    const response: IResponse = {
      statusCode: 201,
      message: 'Producto creado exitosamente',
      data: storedProduct,
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
