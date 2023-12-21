import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Customer from '@models/customer/Customer.model';
import Sales from '@models/sales/Sale.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_id } = req.query;

    const customer = await Customer.findById(customer_id);
    if (!customer) throw boom.notFound('No existe el cliente');

    const sales = await Sales.find({ customer: customer_id });

    if (sales.length > 0) {
      throw boom.badRequest(
        'No es posible eliminar el cliente porque tiene ventas asociadas.'
      );
    }

    await Customer.findByIdAndDelete(customer_id);

    const resDeleteCustomer: IResponse = {
      statusCode: 200,
      message: 'Cliente eliminado exitosamente',
      data: null,
    };

    res.json(resDeleteCustomer);
  } catch (error) {
    next(error);
  }
};
