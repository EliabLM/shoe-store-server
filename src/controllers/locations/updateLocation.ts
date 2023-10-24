import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Location from '@models/locations/Location.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const location = await Location.findById(id);
    if (!location) throw boom.notFound('El local no existe');

    const newLocation = {
      name: req.body.name,
      description: req.body.description,
      active: req.body.active,
    };

    const updatedLocation = await Location.findByIdAndUpdate(id, newLocation, {
      new: true,
    });

    const resLocationUpdated: IResponse = {
      statusCode: 200,
      message: 'Local actualizado exitosamente',
      data: updatedLocation,
    };

    res.json(resLocationUpdated);
  } catch (error) {
    next(error);
  }
};
