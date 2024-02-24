import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Product from '@models/products/Product.model';
import Brand from '@models/brands/Brand.model';
import Category from '@models/categories/Category.model';

// Interfaces
import { IProduct, IResponse } from '../../interfaces';

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, brand, categories } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) throw boom.notFound('El producto no existe');

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

    const newProduct: IProduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      categories: req.body.categories,
      active: req.body.active,
      product_id: product.product_id,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct, {
      new: true,
    });

    const response: IResponse = {
      statusCode: 200,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
