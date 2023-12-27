import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    const user = await User.findById(user_id);
    if (!user) throw boom.notFound('No existe el usuario');

    await User.findByIdAndDelete(user_id);

    const response: IResponse = {
      statusCode: 200,
      message: 'Usuario eliminado exitosamente',
      data: null,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
