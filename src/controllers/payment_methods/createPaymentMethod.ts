import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import PaymentMethod from '@models/payment_methods/PaymentMethods.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createPaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const paymentMethodExists = await PaymentMethod.findOne({ name });

    if (paymentMethodExists) {
      throw boom.badRequest('El método de pago ya se encuentra registrado');
    }

    const paymentMethod = new PaymentMethod(req.body);

    const storedPaymentMethod = await paymentMethod.save();

    const response: IResponse = {
      statusCode: 201,
      message: 'Método de pago creado exitosamente',
      data: {
        name: storedPaymentMethod.name,
      },
    };

    return res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};
