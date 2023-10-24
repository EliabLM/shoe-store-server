import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_id } = req.query;

    if (!customer_id) {
      throw boom.badRequest('El id del cliente es obligatorio');
    }

    const customer = await Customer.findById(customer_id);
    if (!customer) throw boom.notFound('No existe el cliente');

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
