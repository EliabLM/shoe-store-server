import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '../User.model';

// Interfaces
import { IResponse } from 'interfaces';

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      throw boom.badRequest('El id del usuario es obligatorio');
    }

    const response = await User.findByIdAndUpdate(
      user_id,
      { activo: false },
      { new: true }
    );

    if (!response) {
      throw boom.notFound('No se encontró el usuario');
    }

    const deletedUser = {
      id: response._id,
      nombre: response?.nombre,
      email: response?.email,
      rol: response?.rol,
      local: response?.local,
    };

    const resUsuarioEliminado: IResponse = {
      statusCode: 200,
      message: 'Usuario eliminado exitosamente',
      data: deletedUser,
    };

    res.status(201).json(resUsuarioEliminado);
  } catch (error) {
    next(error);
  }
};
