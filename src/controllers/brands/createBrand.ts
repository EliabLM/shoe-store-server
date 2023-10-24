import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Brand from '@models/brands/Brand.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createBrand = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const brandExists = await Brand.findOne({ name });

    if (brandExists) {
      throw boom.badRequest('La marca ya se encuentra registrada');
    }

    const brand = new Brand(req.body);

    const storedBrand = await brand.save();

    const resCreateBrand: IResponse = {
      statusCode: 201,
      message: 'Marca creada exitosamente',
      data: {
        name: storedBrand.name,
      },
    };

    return res.status(201).json(resCreateBrand);
  } catch (error) {
    next(error);
  }
};
