import * as yup from 'yup';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const name = yup
  .string()
  .min(3, 'El nombre debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const active = yup
  .boolean()
  .typeError('El estado debe ser un dato verdadero o falso');

export const createCategorySchema = yup.object().shape({
  name: name.required('El nombre de la categoría es obligatorio'),
});

export const updateCategorySchema = yup.object().shape({
  id: mongoId.required('El id es obligatorio'),
  name: name.required('El nombre de la categoría es obligatorio'),
  active: active.required('El estado es obligatorio'),
});

export const deleteCategorySchema = yup.object().shape({
  category_id: mongoId.required('El id de la categoría es obligatorio'),
});

export const readCategoriesSchema = yup.object().shape({
  active,
});
