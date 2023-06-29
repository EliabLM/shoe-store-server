import { NextFunction, Request, Response } from 'express';

// Model
import User from '../User.model';

// Interfaces
import { IResponse } from 'interfaces';

export const readUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ activo: true });

    const newUsers = users.map((user) => ({
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
      local: user.local,
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
