import * as yup from 'yup';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
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
  .max(100, 'El correo electrónico debe tener máximo 100 caracteres');
const active = yup
  .boolean()
  .typeError('El estado debe ser un dato verdadero o falso');
const code = yup
  .string()
  .matches(
    /^[A-Z0-9]{6}$/,
    'El código debe tener exactamente 6 caracteres, compuestos por letras mayúsculas y números'
  );

export const createSupplierSchema = yup.object().shape({
  name: name.required('El nombre del proveedor es obligatorio'),
  contact,
  email,
  code: code.required('El código del proveedor es obligatorio'),
});

export const updateSupplierSchema = yup.object().shape({
  id: mongoId.required('El id del proveedor es obligatorio'),
  name: name.required('El nombre del proveedor es obligatorio'),
  contact,
  email,
  code: code.required('El código del proveedor es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const updateSupplierStateSchema = yup.object().shape({
  supplier_id: mongoId.required('El id del proveedor es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const deleteSupplierSchema = yup.object().shape({
  supplier_id: mongoId.required('El id del proveedor es obligatorio'),
});
