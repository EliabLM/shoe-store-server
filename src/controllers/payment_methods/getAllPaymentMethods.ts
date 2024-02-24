import { NextFunction, Request, Response } from 'express';

// Model
import PaymentMethod from '@models/payment_methods/PaymentMethods.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllPaymentMethods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { active } = req.query;

    let paymentMethods;
    if (active) {
      paymentMethods = await PaymentMethod.find({ active });
    } else {
      paymentMethods = await PaymentMethod.find();
    }

    const allPaymentMethods = paymentMethods.map((paymentMethod) => ({
      id: paymentMethod._id,
      name: paymentMethod.name,
      active: paymentMethod.active,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allPaymentMethods,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
