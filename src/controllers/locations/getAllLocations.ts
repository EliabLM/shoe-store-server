import { NextFunction, Request, Response } from 'express';

// Model
import Location from '@models/locations/Location.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locations = await Location.find();

    const allLocations = locations.map((location) => ({
      id: location._id,
      name: location.name,
      description: location.description ?? '',
      active: location.active,
    }));

    const resLocations: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allLocations,
    };

    res.json(resLocations);
  } catch (error) {
    next(error);
  }
};
