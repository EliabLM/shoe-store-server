import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { code } = req.body;

  try {
    const existUser = await User.findOne({ code });

    if (existUser) {
      throw boom.badRequest('Ya existe un usuario registrado con ese código');
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    let storedUser = await user.save();
    storedUser = await storedUser.populate('location');

    const resUsuarioCreado: IResponse = {
      statusCode: 201,
      message: 'Usuario creado exitosamente',
      data: {
        names: storedUser.names,
        code: storedUser.code,
        email: storedUser.email,
        role: storedUser.role,
        location: storedUser.location,
      },
    };

    res.status(201).json(resUsuarioCreado);
  } catch (error) {
    next(error);
  }
};
