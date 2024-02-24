import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Location from '@models/locations/Location.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { location_id } = req.query;

    const location = await Location.findById(location_id);
    if (!location) throw boom.notFound('No existe el local');

    await Location.findByIdAndDelete(location_id);

    const resDeleteLocation: IResponse = {
      statusCode: 200,
      message: 'Local eliminado exitosamente',
      data: null,
    };

    res.json(resDeleteLocation);
  } catch (error) {
    next(error);
  }
};
