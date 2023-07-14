import { NextFunction, Request, Response } from 'express';

// Model
import Creditor from '../Creditor.model';

// Interfaces
import { IResponse } from 'interfaces';

export const getCreditors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const creditors = await Creditor.find();

    const newCreditor = creditors.map((creditor) => ({
      id: creditor._id,
      name: creditor.name,
      contact: creditor.contact,
      active: creditor.active,
    }));

    const resCreditors: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: newCreditor,
    };

    res.json(resCreditors);
  } catch (error) {
    next(error);
  }
};
