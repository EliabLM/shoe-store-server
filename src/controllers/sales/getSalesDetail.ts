import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import SaleDetail from '@models/sales_detail/SaleDetail.model';

// Interfaces
import { IResponse } from '../../interfaces';

interface ISaleDetailRes {
  _id: string;
  sale: string;
  product: string;
  price: number;
  amount: number;
  subtotal: number;
  createdAt: string;
  updatedAt: string;
}

export const getSalesDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sale_id } = req.query;

    const sale = await Sale.findById(sale_id);
    if (!sale) throw boom.notFound('No existe la venta');

    const salesDetail: ISaleDetailRes[] = await SaleDetail.find({
      sale: sale_id,
    })
      .populate({
        path: 'product',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'brand',
          select: '-createdAt -updatedAt',
        },
      })
      .populate({
        path: 'product',
        select: '-createdAt -updatedAt',
        populate: {
          path: 'categories',
        },
      });

    const allSalesDetail = salesDetail.map((saleDetail) => ({
      id: saleDetail._id,
      sale: saleDetail.sale,
      product: saleDetail.product,
      price: saleDetail.price,
      amount: saleDetail.amount,
      subtotal: saleDetail.subtotal,
      createdAt: saleDetail.createdAt,
      updatedAt: saleDetail.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allSalesDetail,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
