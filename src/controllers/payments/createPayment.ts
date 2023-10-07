import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Credit from '@models/credits/Credit.model';
import Payment from '@models/payments/Payment.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credit } = req.body;

    const creditStored = await Credit.findById(credit);

    if (!creditStored) {
      throw boom.notFound('No existe el crédito');
    }

    const payment = new Payment(req.body);

    const storedPayment = await payment.save();

    const resUsuarioCreado: IResponse = {
      statusCode: 201,
      message: 'Pago creado exitosamente',
      data: {
        id: storedPayment._id,
        date: storedPayment.date,
        amount: storedPayment.amount,
      },
    };

    res.status(201).json(resUsuarioCreado);
  } catch (error) {
    next(error);
  }
};
