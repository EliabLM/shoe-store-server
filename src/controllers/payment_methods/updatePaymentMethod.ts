import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import PaymentMethod from '@models/payment_methods/PaymentMethods.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updatePaymentMethod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, name } = req.body;

  try {
    const paymentMethod = await PaymentMethod.findById(id);
    if (!paymentMethod) throw boom.notFound('El método de pago no existe');

    const paymentMethodName = await PaymentMethod.findOne({ name });
    if (paymentMethodName && !paymentMethod._id.equals(paymentMethodName._id)) {
      throw boom.badRequest(
        'Ya existe un método de pago con el nombre ingresado'
      );
    }

    const newPaymentMethod = {
      name: req.body.name,
      active: req.body.active,
    };

    const updatedPaymentMethod = await PaymentMethod.findByIdAndUpdate(
      id,
      newPaymentMethod,
      {
        new: true,
      }
    );

    const response: IResponse = {
      statusCode: 200,
      message: 'Método de pago actualizado exitosamente',
      data: updatedPaymentMethod,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
