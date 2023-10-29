import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import SaleDetail from '@models/sales_detail/SaleDetail.model';
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

    const salesDetailExists = await SaleDetail.find({ sale: sale_id });

    await Promise.all(
      salesDetailExists.map(async (saleDetail) => {
        const product = await Product.findById(saleDetail.product);
        if (product && product.stock !== undefined) {
          product.stock += saleDetail.amount;
        }

        await product?.save();
      })
    );

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
