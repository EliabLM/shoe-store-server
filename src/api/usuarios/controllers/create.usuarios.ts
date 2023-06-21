import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../User.model';

const create = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      const error = new Error('El usuario ya se encuentra registrado');
      return res.status(400).json({ msg: error.message });
    }

    const user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    const storedUser = await user.save();

    res.status(201).json({
      msg: 'Usuario creado exitosamente',
      data: { nombre: storedUser.nombre, email: storedUser.email },
    });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno' });
  }
};

export default create;
