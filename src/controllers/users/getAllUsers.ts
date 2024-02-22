import { NextFunction, Request, Response } from 'express';

// Model
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { active } = req.query;

    let users;
    if (active) {
      users = await User.find({ active });
    } else {
      users = await User.find();
    }

    const allUsers = users.map((user) => ({
      id: user._id,
      code: user.code,
      names: user.names,
      email: user.email,
      role: user.role,
      location: {
        name: user.location.name ?? '',
        description: user.location?.description ?? '',
        location_id: user.location.location_id ?? '',
      },
      active: user.active,
    }));

    const response: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allUsers,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
