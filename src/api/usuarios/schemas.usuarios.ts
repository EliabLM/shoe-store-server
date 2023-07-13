import Joi from 'joi';

// Enums
import { Enum_Local, Enum_Rol } from './enums.usuarios';

const nombre = Joi.string().min(3).max(20);
const email = Joi.string().email();
const rol = Joi.string().valid(
  Enum_Rol.SUPERADMIN,
  Enum_Rol.ADMIN,
  Enum_Rol.VENDEDOR
);
const local = Joi.string().valid(
  Enum_Local.LOCAL1,
  Enum_Local.LOCAL2,
  Enum_Local.LOCAL3,
  Enum_Local.LOCAL4
);
const activo = Joi.boolean();
const id = Joi.string();

export const createUserSchema = Joi.object({
  nombre: nombre.required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre no debe estar vació',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
  }),
  email: email.required().messages({
    'string.base': 'El correo electrónico debe ser una cadena de texto',
    'string.empty': 'El correo electrónico es obligatorio',
    'string.email': 'El correo electrónico debe ser válido',
  }),
  rol: rol.messages({
    'string.base': 'El rol debe ser una cadena de texto',
    'any.only':
      'El rol debe ser uno de los siguientes valores: superadmin, admin, vendedor',
  }),
  local: local.messages({
    'string.base': 'El local debe ser una cadena de texto',
    'any.only': 'El valor de local no corresponde a los valores permitidos',
  }),
  activo,
});

export const updateUserSchema = Joi.object({
  nombre: nombre.required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre no debe estar vació',
    'string.min': 'El nombre debe tener al menos {#limit} caracteres',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
  }),
  email: email.required().messages({
    'string.base': 'El correo electrónico debe ser una cadena de texto',
    'string.empty': 'El correo electrónico es obligatorio',
    'string.email': 'El correo electrónico debe ser válido',
  }),
  rol: rol.messages({
    'string.base': 'El rol debe ser una cadena de texto',
    'any.only':
      'El rol debe ser uno de los siguientes valores: superadmin, admin, vendedor',
  }),
  local: local.messages({
    'string.base': 'El local debe ser una cadena de texto',
    'any.only': 'El valor de local no corresponde a los valores permitidos',
  }),
  activo: activo.required().messages({
    'any.required': 'El activo es obligatorio',
  }),
  id: id.required().messages({
    'string.base': 'El id debe ser una cadena de texto',
    'string.empty': 'El id no debe estar vació',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': 'El correo electrónico debe ser una cadena de texto',
    'string.empty': 'El correo electrónico es obligatorio',
    'string.email': 'El correo electrónico debe ser válido',
  }),
  password: Joi.string().required().messages({
    'string.base': 'La contraseña debe ser una cadena de texto',
    'string.empty': 'La contraseña es obligatoria',
  }),
});
