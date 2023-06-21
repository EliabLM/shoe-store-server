import { Schema, model } from 'mongoose';

interface IUser {
  nombre: string;
  password: string;
  email: string;
  rol: string;
  local: string;
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
  },
  local: {
    type: String,
    required: true,
  },
  activo: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const User = model('User', userSchema);
export default User;
