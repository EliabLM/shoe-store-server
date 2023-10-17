import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Creditor from '@models/creditors/Creditor.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateCreditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    try {
      await Creditor.findById(id);
    } catch (error) {
      throw boom.notFound('El acreedor no existe en sistema');
    }

    const newCreditor = {
      name: req.body.name,
      contact: req.body.contact,
      active: req.body.active,
    };

    const updatedCreditor = await Creditor.findByIdAndUpdate(id, newCreditor, {
      new: true,
    });

    const resCreditorUpdated: IResponse = {
      statusCode: 200,
      message: 'Acreedor actualizado exitosamente',
      data: updatedCreditor,
    };

    res.status(200).json(resCreditorUpdated);
  } catch (error) {
    next(error);
  }
};
