import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Credit from '@models/credits/Credit.model';
import Creditor from '@models/creditors/Creditor.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createCredit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { creditor } = req.body;

    const creditorStored = await Creditor.findById(creditor);

    if (!creditorStored) {
      throw boom.notFound('No existe el acreedor ingresado');
    }

    const credit = new Credit(req.body);

    const storedCredit = await credit.save();

    const resUsuarioCreado: IResponse = {
      statusCode: 201,
      message: 'Crédito creado exitosamente',
      data: {
        creationDate: storedCredit.creationDate,
        initialValue: storedCredit.initialValue,
        interestRate: storedCredit.interestRate,
      },
    };

    res.status(201).json(resUsuarioCreado);
  } catch (error) {
    next(error);
  }
};
