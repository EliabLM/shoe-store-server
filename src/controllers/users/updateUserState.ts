import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateUserState = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, active } = req.query;

    const user = await User.findByIdAndUpdate(
      user_id,
      { active },
      { new: true }
    );
    if (!user) throw boom.notFound('No se encontró el usuario');

    const response: IResponse = {
      statusCode: 200,
      message: 'Estado actualizado exitosamente',
      data: {
        names: user.names,
        code: user.code,
        email: user.email,
        role: user.role,
        location: {
          name: user.location.name ?? '',
          description: user.location?.description ?? '',
          location_id: user.location.location_id ?? '',
        },
        active: user.active,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
