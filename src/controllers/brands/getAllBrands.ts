import { NextFunction, Request, Response } from 'express';

// Model
import Brand from '@models/brands/Brand.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllBrands = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await Brand.find();

    const allBrands = brands.map((brand) => ({
      id: brand._id,
      name: brand.name,
      active: brand.active,
    }));

    const resBrands: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allBrands,
    };

    res.json(resBrands);
  } catch (error) {
    next(error);
  }
};
