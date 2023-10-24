import * as yup from 'yup';

const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const active = yup.boolean();
const id = yup.string();

export const createBrandSchema = yup.object().shape({
  name: name.required('El nombre de la marca es obligatorio'),
});

export const updateBrandSchema = yup.object().shape({
  name: name.required('El nombre de la marca es obligatorio'),
  id: id.required('El id es obligatorio'),
  active: active.required('El estado es obligatorio'),
});
