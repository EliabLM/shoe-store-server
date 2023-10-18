import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import User from '@models/users/User.model';

// Interfaces
import { IResponse } from 'interfaces';

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      throw boom.badRequest('El id del usuario es obligatorio');
    }

    try {
      await User.findById(user_id);
    } catch (error) {
      throw boom.notFound('No existe el usuario');
    }

    // const credits = await Credit.find({ creditor: user_id });

    // if (credits.length > 0) {
    //   throw boom.badRequest(
    //     'No es posible eliminar el acreedor porque tiene créditos asociados, primero elimine los créditos asociados y luego proceda a eliminar el acreedor.'
    //   );
    // }

    await User.findByIdAndDelete(user_id);

    const resDeleteUser: IResponse = {
      statusCode: 200,
      message: 'Usuario eliminado exitosamente',
      data: null,
    };

    res.status(200).json(resDeleteUser);
  } catch (error) {
    next(error);
  }
};
