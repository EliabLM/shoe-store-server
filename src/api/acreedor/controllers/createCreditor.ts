import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Creditor from '../Creditor.model';

// Interfaces
import { IResponse } from 'interfaces';

export const createCreditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const creditorExists = await Creditor.findOne({ name });

    if (creditorExists) {
      throw boom.badRequest('El acreedor ya se encuentra registrado');
    }

    const creditor = new Creditor(req.body);

    const storedCreditor = await creditor.save();

    const resCreateCreditor: IResponse = {
      statusCode: 201,
      message: 'Acreedor creado exitosamente',
      data: {
        name: storedCreditor.name,
        contact: storedCreditor.contact,
      },
    };

    return res.status(201).json(resCreateCreditor);
  } catch (error) {
    next(error);
  }
};
