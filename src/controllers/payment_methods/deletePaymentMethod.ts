import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import PaymentMethod from '@models/payment_methods/PaymentMethods.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deletePaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { payment_method_id } = req.query;

    const paymentMethod = await PaymentMethod.findById(payment_method_id);
    if (!paymentMethod) throw boom.notFound('No existe el método de pago');

    await PaymentMethod.findByIdAndDelete(payment_method_id);

    const response: IResponse = {
      statusCode: 200,
      message: 'Método de pago eliminado exitosamente',
      data: null,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
