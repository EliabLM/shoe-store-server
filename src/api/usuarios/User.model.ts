import { User } from 'interfaces';
import { Schema, model } from 'mongoose';
import { Enum_Local, Enum_Rol } from './enums.usuarios';

const userSchema = new Schema<User>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo es obligatorio'],
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
    hasPassword: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema, 'usuarios');
export default User;
