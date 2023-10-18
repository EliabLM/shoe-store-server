import * as yup from 'yup';

// Enums
import { Enum_Local, Enum_Rol } from 'interfaces';

const nombre = yup
  .string()
  .min(3, 'Debe ingresar mínimo 3 caracteres')
  .max(20, 'Debe ingresar máximo 20 caracteres');
const email = yup.string().email('Debe ingresar un correo válido');
const rol = yup
  .string()
  .oneOf(
    [Enum_Rol.SUPERADMIN, Enum_Rol.ADMIN, Enum_Rol.VENDEDOR],
    'El rol no es válido'
  );
const local = yup
  .string()
  .oneOf(
    [
      Enum_Local.LOCAL1,
      Enum_Local.LOCAL2,
      Enum_Local.LOCAL3,
      Enum_Local.LOCAL4,
    ],
    'El local no es válido'
  );
const activo = yup.boolean();
const id = yup.string();
const password = yup.string();

export const createUserSchema = yup.object().shape({
  nombre: nombre.required('El nombre es obligatorio'),
  email: email.required('El correo electrónico es obligatorio'),
  rol: rol.required('El rol es obligatorio'),
  local: local.required('El local es obligatorio'),
  activo,
});

export const updateUserSchema = yup.object().shape({
  nombre: nombre.required('El nombre es obligatorio'),
  email: email.required('El correo electrónico es obligatorio'),
  rol: rol.required('El rol es obligatorio'),
  local: local.required('El local es obligatorio'),
  activo: activo.required('El estado es obligatorio'),
  id: id.required('El id es obligatorio'),
});

export const loginSchema = yup.object().shape({
  email: email.required('El correo electrónico es obligatorio'),
  password: password.required('La contraseña es obligatoria'),
});
