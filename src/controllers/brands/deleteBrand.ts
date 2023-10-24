import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Brand from '@models/brands/Brand.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { brand_id } = req.query;

    if (!brand_id) {
      throw boom.badRequest('El id de la marca es obligatorio');
    }

    const brand = await Brand.findById(brand_id);
    if (!brand) throw boom.notFound('No existe la marca');

    await Brand.findByIdAndDelete(brand_id);

    const resDeleteBrand: IResponse = {
      statusCode: 200,
      message: 'Marca eliminada exitosamente',
      data: null,
    };

    res.json(resDeleteBrand);
  } catch (error) {
    next(error);
  }
};
