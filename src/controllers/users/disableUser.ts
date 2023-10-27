import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const disableUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      throw boom.badRequest('El id del usuario es requerido');
    }

    const disabledUser = await User.findByIdAndUpdate(
      user_id,
      { active: false },
      { new: true }
    );
    if (!disabledUser) throw boom.notFound('No se encontró el usuario');

    const response: IResponse = {
      statusCode: 200,
      message: 'Usuario deshabilitado exitosamente',
      data: {
        names: disabledUser.names,
        code: disabledUser.code,
        email: disabledUser.email,
        role: disabledUser.role,
      },
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
