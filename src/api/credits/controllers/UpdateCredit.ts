import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Credit from '../Credit.model';

// Interfaces
import { IResponse } from 'interfaces';

export const updateCredit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const existCredit = await Credit.findById(id);

    if (!existCredit) {
      throw boom.notFound('El acreedor no existe en sistema');
    }

    const newCredit = {
      creditor: req.body.creditor,
      initialValue: req.body.initialValue,
      creationDate: req.body.creationDate,
      interestRate: req.body.interestRate,
      active: req.body.active,
    };

    const updatedCredit = await Credit.findByIdAndUpdate(id, newCredit, {
      new: true,
    });

    const resCreditUpdated: IResponse = {
      statusCode: 200,
      message: 'Crédito actualizado exitosamente',
      data: updatedCredit,
    };

    res.status(200).json(resCreditUpdated);
  } catch (error) {
    next(error);
  }
};
