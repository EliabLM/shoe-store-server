import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.query;

    if (!product_id) {
      throw boom.badRequest('El id del producto es obligatorio');
    }

    const product = await Product.findById(product_id);
    if (!product) throw boom.notFound('No existe el producto');

    await Product.findByIdAndDelete(product_id);

    const response: IResponse = {
      statusCode: 200,
      message: 'Producto eliminado exitosamente',
      data: null,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
