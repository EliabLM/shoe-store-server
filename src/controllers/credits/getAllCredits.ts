import { NextFunction, Request, Response } from 'express';

// Model
import Credit from '@models/credits/Credit.model';

import { IResponse } from '../../interfaces';

export const getAllCredits = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const credits = await Credit.find().populate('creditor');

    const resCredits: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: credits,
    };

    res.json(resCredits);
  } catch (error) {
    next(error);
  }
};
