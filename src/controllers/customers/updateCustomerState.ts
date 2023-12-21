import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateCustomerState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customer_id, active } = req.query;

    const customer = await Customer.findByIdAndUpdate(
      customer_id,
      { active },
      { new: true }
    );

    if (!customer) throw boom.notFound('No se encontró el cliente');

    const response: IResponse = {
      statusCode: 200,
      message: 'Estado actualizado exitosamente',
      data: {
        name: customer.name,
        code: customer.code,
        email: customer.email,
        contact: customer.contact,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
