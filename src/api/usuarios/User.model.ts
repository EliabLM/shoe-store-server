import { Schema, model } from 'mongoose';
import { Enum_Local, Enum_Rol } from './enums.usuarios';

interface IUser {
  nombre: string;
  password: string;
  email: string;
  rol: Enum_Rol;
  local: Enum_Local;
  activo: boolean;
}

const userSchema = new Schema<IUser>({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    enum: Enum_Rol,
  },
  local: {
    type: String,
    required: true,
    enum: Enum_Local,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const User = model('User', userSchema, 'usuarios');
export default User;
