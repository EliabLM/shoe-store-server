import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Product from '@models/products/Product.model';

// Interfaces
import { IProduct, IResponse } from '../../interfaces';

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) throw boom.notFound('El producto no existe');

    const newProduct: IProduct = {
      code: product.code,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      brand: req.body.brand,
      categories: req.body.categories,
      active: req.body.active,
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
