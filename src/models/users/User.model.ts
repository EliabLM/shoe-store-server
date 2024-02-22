import { User, Enum_Rol } from '../../interfaces';
import { Schema, model } from 'mongoose';

const userSchema = new Schema<User>(
  {
    names: {
      type: String,
      required: [true, 'Los nombres son obligatorios'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'El código del usuario es obligatorio'],
      unique: true,
      trim: true,
      minlength: 6,
      maxlength: 6,
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
      lowercase: true,
    },
    role: {
      type: String,
      enum: Enum_Rol,
      default: Enum_Rol.VENDEDOR,
    },
    location: {
      type: {
        name: {
          type: String,
          required: [true, 'El nombre es obligatorio'],
          lowercase: true,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
        location_id: {
          type: Schema.Types.ObjectId,
          ref: 'Location',
          required: [true, 'El id del local es obligatorio'],
        },
      },
      required: [true, 'El local es obligatorio'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema, 'users');
export default User;
