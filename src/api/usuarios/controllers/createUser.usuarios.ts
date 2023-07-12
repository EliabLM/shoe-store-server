import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

// Model
import User from '../User.model';

// Interfaces
import { IResponse } from 'interfaces';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      throw boom.badRequest('El usuario ya se encuentra registrado');
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(process.env.GENERIC_PASSWORD || '', salt);

    const storedUser = await user.save();

    const resUsuarioCreado: IResponse = {
      statusCode: 201,
      message: 'Usuario creado exitosamente',
      data: { nombre: storedUser.nombre, email: storedUser.email },
    };

    res.status(201).json(resUsuarioCreado);
  } catch (error) {
    next(error);
  }
};
