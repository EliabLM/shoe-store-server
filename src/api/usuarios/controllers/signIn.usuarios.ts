import { Request, Response } from 'express';
import { IResponse } from 'interfaces';
import User from '../User.model';
import bcrypt from 'bcrypt';

interface SignInRequest {
  email: string;
  password: string;
}

export const signIn = async (req: Request<SignInRequest>, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    const error = new Error('Correo ó contraseña incorrectos');

    if (!user) {
      const resBadSigIn: IResponse = {
        code: 404,
        message: error.message,
        data: null,
      };

      return res.status(404).json(resBadSigIn);
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
      const resBadPassword: IResponse = {
        code: 403,
        message: error.message,
        data: null,
      };

      return res.status(403).json(resBadPassword);
    }

    const resSignIn: IResponse = {
      code: 200,
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
    const response: IResponse = {
      code: 500,
      message: 'Ha ocurrido un error interno',
      data: null,
      error,
    };

    res.status(500).json(response);
  }
};
