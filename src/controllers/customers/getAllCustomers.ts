import { NextFunction, Request, Response } from 'express';

// Model
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customers = await Customer.find();

    const allCustomers = customers.map((customer) => ({
      id: customer._id,
      name: customer.name,
      contact: customer.contact ?? '',
      email: customer.email ?? '',
      active: customer.active,
    }));

    const resCustomers: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allCustomers,
    };

    res.json(resCustomers);
  } catch (error) {
    next(error);
  }
};
