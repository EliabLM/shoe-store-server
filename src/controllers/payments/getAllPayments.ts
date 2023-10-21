import { NextFunction, Request, Response } from 'express';

// Model
import Payment from '@models/payments/Payment.model';

import { IResponse } from '../../interfaces';

export const getAllPayments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payments = await Payment.find().populate({
      path: 'credit',
      model: 'Credit',
      populate: {
        path: 'creditor',
        model: 'Creditor',
      },
    });

    const resPayments: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: payments,
    };

    res.status(200).json(resPayments);
  } catch (error) {
    next(error);
  }
};
