import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code, password } = req.body;

    const user = await User.findOne({ code }).populate('location');

    if (!user) throw boom.notFound('El usuario no se encuentra registrado');

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw boom.badRequest('Código ó contraseña incorrectos');

    const response: IResponse = {
      statusCode: 200,
      message: 'Usuario autenticado exitosamente',
      data: {
        id: user._id,
        code: user.code,
        names: user.names,
        email: user.email,
        role: user.role,
        location: user.location,
      },
    };

    return res.json(response);
  } catch (error) {
    next(error);
  }
};
