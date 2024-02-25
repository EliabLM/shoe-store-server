import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import Product from '@models/products/Product.model';

// Interfaces
import { IResponse, Enum_Sale_status } from '../../interfaces';

export const cancelSale = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sale_id } = req.query;

    const saleExists = await Sale.findById(sale_id);
    if (!saleExists) throw boom.notFound('No existe la venta');

    if (saleExists.sale_status === Enum_Sale_status.CANCELADA)
      throw boom.badRequest('La venta se encuentra cancelada');

    for (const saleDetail of saleExists.sale_detail) {
      const storedProduct = await Product.findById(
        saleDetail.product.product_mongo_id
      );

      if (storedProduct && storedProduct.stock !== undefined) {
        storedProduct.stock += saleDetail.amount;
      }

      await storedProduct?.save();
    }

    const canceledSale = await Sale.findByIdAndUpdate(
      sale_id,
      { sale_status: Enum_Sale_status.CANCELADA },
      { new: true }
    );

    const response: IResponse = {
      statusCode: 200,
      message: 'Venta cancelada exitosamente',
      data: canceledSale,
    };

    return res.json(response);
  } catch (error) {
    next(error);
  }
};
