import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Brand from '@models/brands/Brand.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const brand = await Brand.findById(id);
    if (!brand) throw boom.notFound('La marca no existe');

    const newBrand = {
      name: req.body.name,
      active: req.body.active,
    };

    const updatedBrand = await Brand.findByIdAndUpdate(id, newBrand, {
      new: true,
    });

    const resBrandUpdated: IResponse = {
      statusCode: 200,
      message: 'Marca actualizada exitosamente',
      data: updatedBrand,
    };

    res.json(resBrandUpdated);
  } catch (error) {
    next(error);
  }
};
