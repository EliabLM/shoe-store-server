import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Payment from '@models/payments/Payment.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getPaymentsByCreditId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { credit_id } = req.query;

    if (!credit_id) {
      throw boom.badRequest('El id del crédito es obligatorio');
    }

    const payments = await Payment.find({ credit: credit_id });

    const resPayments: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: payments,
    };

    res.json(resPayments);
  } catch (error) {
    next(error);
  }
};
