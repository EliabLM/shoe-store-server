import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Creditor from '../Creditor.model';
import { Credit } from '@api/credits';

// Interfaces
import { IResponse } from 'interfaces';

export const deleteCreditor = async (
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

    if (credits.length > 0) {
      throw boom.badRequest(
        'No es posible eliminar el acreedor porque tiene créditos asociados, primero elimine los créditos asociados y luego proceda a eliminar el acreedor.'
      );
    }

    await Creditor.findByIdAndDelete(creditor_id);

    const resDeleteCreditor: IResponse = {
      statusCode: 200,
      message: 'Acreedor eliminado exitosamente',
      data: null,
    };

    res.status(200).json(resDeleteCreditor);
  } catch (error) {
    next(error);
  }
};
