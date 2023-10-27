import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';
import Location from '@models/locations/Location.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, location } = req.body;

    const locationExists = await Location.findById(location);
    if (!locationExists) throw boom.notFound('El local no existe');

    const newUser = {
      names: req.body.names,
      code: req.body.code,
      email: req.body.email,
      location: req.body.location,
      role: req.body.role,
      active: req.body.active,
    };

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
      select: { password: 0 },
    }).populate('location');

    if (!updatedUser) throw boom.notFound('El usuario no existe en sistema');

    const response: IResponse = {
      statusCode: 200,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
