import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Sale from '@models/sales/Sale.model';
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';
import { ISale } from './getAllSales';

export const getSalesByCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_id, sale_status } = req.query;

    const customer = await Customer.findById(customer_id);
    if (!customer) throw boom.notFound('No existe el cliente');

    let sales: ISale[];
    if (sale_status) {
      sales = await Sale.find({
        sale_status,
        'customer.customer_id': customer_id,
      });
    } else {
      sales = await Sale.find({
        'customer.customer_id': customer_id,
      });
    }

    const allSales = sales.map((sale) => ({
      id: sale._id,
      user: sale.user,
      customer: sale.customer ?? null,
      sale_location: sale.sale_location,
      total: sale.total,
      payment_method: sale.payment_method,
      sale_status: sale.sale_status,
      registration_date: sale.registration_date,
      sale_detail: sale.sale_detail,
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
