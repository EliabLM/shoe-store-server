import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from 'interfaces';

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

    let response;
    try {
      response = await User.findByIdAndUpdate(
        user_id,
        { active: false },
        { new: true }
      );
    } catch (error) {
      throw boom.notFound('No se encontró el usuario');
    }

    const userDisabled = {
      id: response?._id,
      nombre: response?.nombre,
      email: response?.email,
      rol: response?.rol,
      local: response?.local,
    };

    const resUserDisabled: IResponse = {
      statusCode: 200,
      message: 'Usuario deshabilitado exitosamente',
      data: userDisabled,
    };

    res.status(200).json(resUserDisabled);
  } catch (error) {
    next(error);
  }
};
