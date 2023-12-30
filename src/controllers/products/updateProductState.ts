import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateProductState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id, active } = req.query;

    const product = await Product.findByIdAndUpdate(
      product_id,
      { active },
      { new: true }
    );

    if (!product) throw boom.notFound('No se encontró el producto');

    const response: IResponse = {
      statusCode: 200,
      message: 'Estado actualizado exitosamente',
      data: product,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
