import { Request, Response } from 'express';
import User from '../User.model';

export const readUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    const newUsers = users
      .filter((activeUser) => activeUser.activo)
      .map((user) => ({
        id: user._id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
        local: user.local,
      }));

    res.json({
      code: 200,
      message: 'Datos obtenidos correctamente',
      data: newUsers,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Error cargando los usuarios',
      data: null,
      error,
    });
  }
};
