import * as yup from 'yup';

const id = yup.string();
const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombres debe tener máximo 30 caracteres');
const contact = yup
  .string()
  .max(20, 'El número de contacto debe tener máximo 20 caracteres');
const email = yup
  .string()
  .email('Debe ingresar un correo electrónico válido')
  .min(5, 'El correo electrónico debe tener mínimo 5 caracteres')
  .max(30, 'El correo electrónico debe tener máximo 30 caracteres');
const active = yup.boolean();

export const createSupplierSchema = yup.object().shape({
  name: name.required('El nombre del proveedor es obligatorio'),
  contact,
  email,
});

export const updateSupplierSchema = yup.object().shape({
  id: id.required('El id del proveedor es obligatorio'),
  name: name.required('El nombre del proveedor es obligatorio'),
  contact,
  email,
  active: active.required('El estado es obligatorio'),
});
