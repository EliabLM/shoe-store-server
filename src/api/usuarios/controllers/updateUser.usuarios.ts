import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import User from '../User.model';

// Interfaces
import { IResponse } from 'interfaces';

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const existUser = await User.findById(id);

    if (!existUser) {
      throw boom.notFound('Usuario no existe en sistema');
    }

    const newUser = {
      nombre: req.body.nombre,
      email: req.body.email,
      local: req.body.local,
      rol: req.body.role,
      activo: req.body.activo,
    };

    const updatedUser = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    const resUsuarioCreado: IResponse = {
      statusCode: 200,
      message: 'Usuario actualizado exitosamente',
      data: updatedUser,
    };

    res.status(200).json(resUsuarioCreado);
  } catch (error) {
    next(error);
  }
};
