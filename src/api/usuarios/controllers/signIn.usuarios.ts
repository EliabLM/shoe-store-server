import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

// Model
import User from '../User.model';

// Interfaces
import { IResponse } from 'interfaces';

interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (
  req: Request<SignInRequest>,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw boom.notFound('El usuario no se encuentra registrado');
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      throw boom.badRequest('Usuario ó contraseña incorrectos');
    }

    const resSignIn: IResponse = {
      statusCode: 200,
      message: 'Usuario autenticado exitosamente',
      data: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        local: user.local,
      },
    };
    return res.status(200).json(resSignIn);
  } catch (error) {
    next(error);
  }
};
