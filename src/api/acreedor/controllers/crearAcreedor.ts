import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Acreedor from '../Acreedor.model';

// Interfaces
import { IResponse } from 'interfaces';

export const createCreditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const creditorExists = await Acreedor.findOne({ name });

    if (creditorExists) {
      throw boom.badRequest('El acreedor ya se encuentra registrado');
    }

    const creditor = new Acreedor(req.body);

    const storedCreditor = await creditor.save();

    const resCreateCreditor: IResponse = {
      statusCode: 201,
      message: 'Acreedor creado exitosamente',
      data: {
        nombre: storedCreditor.name,
        contacto: storedCreditor.contact,
      },
    };

    return res.status(201).json(resCreateCreditor);
  } catch (error) {
    next(error);
  }
};
