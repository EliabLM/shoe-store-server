import { NextFunction, Request, Response } from 'express';

// Model
import Sale from '@models/sales/Sale.model';

// Interfaces
import { IResponse } from '../../interfaces';
import { Payment_method, Sale_status } from '../../types/types';

interface ISaleRes {
  _id: string;
  user: string;
  customer: string;
  total: number;
  payment_method: Payment_method;
  sale_status: Sale_status;
  createdAt: string;
  updatedAt: string;
}

export const getAllSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sales: ISaleRes[] = await Sale.find()
      .populate({ path: 'user', select: '-createdAt -updatedAt' })
      .populate({ path: 'customer', select: '-createdAt -updatedAt' });

    const allSales = sales.map((sale) => ({
      id: sale._id,
      user: sale.user,
      customer: sale.customer,
      total: sale.total,
      payment_method: sale.payment_method,
      sale_status: sale.sale_status,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allSales,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
