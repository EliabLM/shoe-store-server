import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Customer from '@models/customer/Customer.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const customer = await Customer.findById(id);
    if (!customer) throw boom.notFound('El cliente no existe');

    const newCustomer = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      active: req.body.active,
    };

    const updatedCustomer = await Customer.findByIdAndUpdate(id, newCustomer, {
      new: true,
    });

    const resCustomerUpdated: IResponse = {
      statusCode: 200,
      message: 'Cliente actualizado exitosamente',
      data: updatedCustomer,
    };

    res.json(resCustomerUpdated);
  } catch (error) {
    next(error);
  }
};
