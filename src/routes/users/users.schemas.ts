import * as yup from 'yup';

// Enums
import { Enum_Rol } from '../../interfaces';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const names = yup
  .string()
  .min(3, 'Los nombres deben tener mínimo 3 caracteres')
  .max(30, 'Los nombres deben tener máximo 30 caracteres');
const code = yup
  .string()
  .matches(
    /^[A-Z0-9]{6}$/,
    'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
  );
const email = yup.string().email('Debe ingresar un correo válido');
const role = yup
  .string()
  .oneOf(
    [Enum_Rol.SUPERADMIN, Enum_Rol.ADMIN, Enum_Rol.VENDEDOR],
    'El rol no es válido'
  );
const active = yup
  .boolean()
  .typeError('El estado debe ser un dato verdadero o falso');
const password = yup
  .string()
  .min(6, 'La contraseña debe tener mínimo 6 caracteres');
const location = yup.object().shape({
  name: yup.string().required('El nombre del local es obligatorio'),
  description: yup.string().nullable(),
  location_id: mongoId.required('El id del local es obligatorio'),
});

export const createUserSchema = yup.object().shape({
  names: names.required('Los nombres son obligatorios'),
  code: code.required('El código es obligatorio'),
  password: password.required('La contraseña es obligatoria'),
  email: email.required('El correo electrónico es obligatorio'),
  role: role.required('El rol es obligatorio'),
  location: location.required('El local es obligatorio'),
});

export const updateUserSchema = yup.object().shape({
  id: mongoId.required('El id del usuario es obligatorio'),
  names: names.required('Los nombres son obligatorios'),
  email: email.required('El correo electrónico es obligatorio'),
  role: role.required('El rol es obligatorio'),
  location: location.required('El local es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const loginSchema = yup.object().shape({
  code: code.required('El código del usuario es obligatorio'),
  password: password.required('La contraseña es obligatoria'),
});

export const updateUserStateSchema = yup.object().shape({
  user_id: mongoId.required('El id del usuario es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const deleteUserSchema = yup.object().shape({
  user_id: mongoId.required('El id del usuario es obligatorio'),
});

export const readUsersSchema = yup.object().shape({
  active,
});
