import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Location from '@models/locations/Location.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  try {
    const locationExists = await Location.findOne({ name });

    if (locationExists) {
      throw boom.badRequest('El local ya se encuentra registrado');
    }

    const location = new Location(req.body);

    const storedLocation = await location.save();

    const resCreateLocation: IResponse = {
      statusCode: 201,
      message: 'Local creado exitosamente',
      data: {
        name: storedLocation.name,
        description: storedLocation.description ?? '',
      },
    };

    return res.status(201).json(resCreateLocation);
  } catch (error) {
    next(error);
  }
};
