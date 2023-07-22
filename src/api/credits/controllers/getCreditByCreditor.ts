import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Credit from '../Credit.model';

// Interfaces
import { IResponse } from 'interfaces';

export const getCreditsByCreditorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { creditor_id } = req.query;

    if (!creditor_id) {
      throw boom.badRequest('El id del acreedor es obligatorio');
    }

    const credits = await Credit.find({ creditor: creditor_id });

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
