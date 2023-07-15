import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Creditor from '../Creditor.model';

// Interfaces
import { IResponse } from 'interfaces';

export const disableCreditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { creditor_id } = req.query;

    if (!creditor_id) {
      throw boom.badRequest('El id del acreedor es obligatorio');
    }

    const response = await Creditor.findByIdAndUpdate(
      creditor_id,
      { active: false },
      { new: true }
    );

    if (!response) {
      throw boom.notFound('No se encontró el acreedor');
    }

    const creditorDisabled = {
      id: response._id,
      name: response?.name,
      contact: response?.contact,
      active: response.active,
    };

    const resCreditorDisabled: IResponse = {
      statusCode: 200,
      message: 'Acreedor deshabilitado exitosamente',
      data: creditorDisabled,
    };

    res.status(201).json(resCreditorDisabled);
  } catch (error) {
    next(error);
  }
};
