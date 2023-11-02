import * as yup from 'yup';
import { Enum_purchase_status } from '../../interfaces';

const mongoId = yup.string().matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido');
const total = yup
  .number()
  .typeError('Debe ingresar un número')
  .min(10000, 'El valor mínimo es de $10.000');
const purchase_status = yup
  .string()
  .oneOf(
    [
      Enum_purchase_status.CANCELADA,
      Enum_purchase_status.PAGADA,
      Enum_purchase_status.PENDIENTE,
      Enum_purchase_status.VENCIDA,
    ],
    'El estado no es válido'
  );

const registration_date = yup
  .string()
  .test(
    'es-formato-iso',
    'La fecha de registro debe tener formato ISO',
    (value) => {
      return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?)$/.test(
        value || ''
      );
    }
  );
const expiration_date = yup
  .string()
  .test(
    'es-formato-iso',
    'La fecha de vencimiento debe tener formato ISO',
    (value) => {
      return /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z?)$/.test(
        value || ''
      );
    }
  );

const detail = yup.object().shape({
  product_id: yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido')
    .required('El id del producto es obligatorio'),
  price: yup
    .number()
    .typeError('El precio debe ser un número')
    .positive('El precio debe ser un número positivo')
    .required('El precio es obligatorio'),
  amount: yup
    .number()
    .typeError('La cantidad debe ser un número')
    .positive('La cantidad debe ser un número positivo')
    .min(1, 'La cantidad mínima es 1')
    .required('La cantidad es obligatoria'),
  subtotal: yup
    .number()
    .typeError('El subtotal debe ser un número')
    .positive('El subtotal debe ser un número positivo')
    .required('El subtotal es obligatorio'),
});
const detail_list = yup.array().of(detail);

export const createPurchaseSchema = yup.object().shape({
  user: mongoId.required('El id del usuario es obligatorio'),
  supplier: mongoId.required('El id del proveedor es obligatorio'),
  total: total.required('El total es obligatorio'),
  detail_list: detail_list
    .min(1, 'Se debe incluir al menos un producto en la compra')
    .required('Los productos son obligatorios'),
  expiration_date: expiration_date.required(
    'La fecha de vencimiento es obligatoria'
  ),
  registration_date: registration_date.required(
    'La fecha de registro es obligatoria'
  ),
});

export const updatePurchaseSchema = yup.object().shape({
  id: mongoId.required('El id de la venta es obligatorio'),
  user: mongoId.required('El id del usuario es obligatorio'),
  supplier: mongoId.required('El id del cliente es obligatorio'),
  total: total.required('El total es obligatorio'),
  purchase_status: purchase_status.required('El estado es obligatorio'),
  expiration_date: expiration_date.required(
    'La fecha de vencimiento es obligatoria'
  ),
  registration_date: registration_date.required(
    'La fecha de registro es obligatoria'
  ),
});

export const getPurchasesBySupplierSchema = yup.object().shape({
  supplier_id: mongoId.required('El id del proveedor es obligatorio'),
});

export const cancelPurchaseSchema = yup.object().shape({
  purchase_id: mongoId.required('El id de la compra es obligatorio'),
});
