import { Request, Response } from 'express';

// Model
import Acreedor from '../Acreedor.model';

// Interfaces
import { IResponse } from 'interfaces';

interface CreditorRequest {
  name: string;
  contact?: string;
}

export const createCreditor = async (
  req: Request<CreditorRequest>,
  res: Response
) => {
  const { name } = req.body;

  try {
    const creditorExists = await Acreedor.findOne({ name });

    if (creditorExists) {
      const error = new Error('El acreedor ya se encuentra registrado');

      const resError: IResponse = {
        code: 400,
        message: error.message,
        data: null,
      };

      return res.status(400).json(resError);
    }

    const creditor = new Acreedor(req.body);

    const storedCreditor = await creditor.save();

    const resCreateCreditor: IResponse = {
      code: 201,
      message: 'Acreedor creado exitosamente',
      data: {
        nombre: storedCreditor.name,
        contacto: storedCreditor.contact,
      },
    };

    return res.status(201).json(resCreateCreditor);
  } catch (error) {
    const badResponse: IResponse = {
      code: 500,
      message: 'Ha ocurrido un error interno',
      data: null,
      error,
    };

    res.status(500).json(badResponse);
  }
};
