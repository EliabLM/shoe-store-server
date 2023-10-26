import { NextFunction, Request, Response } from 'express';
// import boom from '@hapi/boom';

// Model
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product(req.body);

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
