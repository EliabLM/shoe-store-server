import * as yup from 'yup';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const categories = yup
  .array()
  .of(mongoId)
  .min(1, 'El producto debe tener por lo menos una categoría');
const name = yup
  .string()
  .min(3, 'El nombres debe tener mínimo 3 caracteres')
  .max(30, 'El nombre debe tener máximo 30 caracteres');
const description = yup.string();
const price = yup
  .number()
  .positive('El precio solo acepta números positivos')
  .typeError('Debe ingresar un número')
  .min(10000, 'El valor mínimo es 10.000');
const active = yup.boolean();

export const createProductSchema = yup.object().shape({
  brand: mongoId.required('La marca es obligatoria'),
  categories: categories.required(
    'Las categorías son obligatorias, debe ingresar por lo menos una'
  ),
  name: name.required('El nombre del producto es obligatorio'),
  description,
  price: price.required('El precio es obligatorio'),
});

export const updateProductSchema = yup.object().shape({
  id: mongoId.required('El id del producto es obligatorio'),
  brand: mongoId.required('La marca es obligatoria'),
  categories: categories.required(
    'Las categorías son obligatorias, debe ingresar por lo menos una'
  ),
  name: name.required('El nombre del producto es obligatorio'),
  description,
  price: price.required('El precio es obligatorio'),
  active: active.required('El estado es obligatorio'),
});
