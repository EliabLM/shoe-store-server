import { NextFunction, Request, Response } from 'express';

// Model
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { active } = req.query;

    let products;
    if (active) {
      products = await Product.find({ active })
        .populate({ path: 'brand', select: '-createdAt -updatedAt' })
        .populate({ path: 'categories', select: '-createdAt -updatedAt' });
    } else {
      products = await Product.find()
        .populate({ path: 'brand', select: '-createdAt -updatedAt' })
        .populate({ path: 'categories', select: '-createdAt -updatedAt' });
    }

    const allProducts = products.map((product) => ({
      id: product._id,
      code: product.code,
      brand: product.brand,
      categories: product.categories,
      name: product.name,
      description: product.description ?? '',
      price: product.price,
      stock: product.stock ?? 0,
      active: product.active,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allProducts,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
