import { User } from 'interfaces';
import { Schema, model } from 'mongoose';
import { Enum_Local, Enum_Rol } from './enums.usuarios';

const userSchema = new Schema<User>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'El correo es requerido'],
    trim: true,
    unique: true,
    lowercase: true,
  },
  rol: {
    type: String,
    enum: Enum_Rol,
    default: Enum_Rol.VENDEDOR,
  },
  local: {
    type: String,
    enum: Enum_Local,
    default: Enum_Local.LOCAL1,
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

const User = model('User', userSchema, 'usuarios');
export default User;
