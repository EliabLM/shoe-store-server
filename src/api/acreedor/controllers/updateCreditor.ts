import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Creditor from '../Creditor.model';

// Interfaces
import { IResponse } from 'interfaces';

export const updateCreditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const existCreditor = await Creditor.findById(id);

    if (!existCreditor) {
      throw boom.notFound('El acreedor no existe en sistema');
    }

    const newUser = {
      name: req.body.name,
      contact: req.body.contact,
      active: req.body.active,
    };

    const updatedCreditor = await Creditor.findByIdAndUpdate(id, newUser, {
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
