import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const customerExists = await Customer.findOne({ name });

    if (customerExists) {
      throw boom.badRequest('El cliente ya se encuentra registrado');
    }

    const customer = new Customer(req.body);

    const storedCustomer = await customer.save();

    const resCreateCustomer: IResponse = {
      statusCode: 201,
      message: 'cliente creado exitosamente',
      data: {
        name: storedCustomer.name,
        email: storedCustomer.email,
        contact: storedCustomer.contact,
      },
    };

    return res.status(201).json(resCreateCustomer);
  } catch (error) {
    next(error);
  }
};
