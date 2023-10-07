import { NextFunction, Request, Response } from 'express';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    const newUsers = users.map((user) => ({
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      local: user.local,
      activo: user.activo,
    }));

    const resUsers: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: newUsers,
    };

    res.json(resUsers);
  } catch (error) {
    next(error);
  }
};