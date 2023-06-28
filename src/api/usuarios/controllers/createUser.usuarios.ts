import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../User.model';
import { IResponse } from 'interfaces';

export const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      const error = new Error('El usuario ya se encuentra registrado');
      const resError: IResponse = {
        code: 400,
        message: error.message,
        data: null,
      };

      return res.status(400).json(resError);
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const storedUser = await user.save();

    const resUsuarioCreado: IResponse = {
      code: 201,
      message: 'Usuario creado exitosamente',
      data: { nombre: storedUser.nombre, email: storedUser.email },
    };

    res.status(201).json(resUsuarioCreado);
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
