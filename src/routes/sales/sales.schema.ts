import * as yup from 'yup';
import { Enum_Rol, Enum_Sale_status } from '../../interfaces';

const mongoId = yup
  .string()
  .matches(/^[0-9a-fA-F]{24}$/, 'El id no es válido')
  .typeError('El id debe ser una cadena de texto');
const names = yup
  .string()
  .min(3, 'Los nombres deben tener mínimo 3 caracteres')
  .max(30, 'Los nombres deben tener máximo 30 caracteres');
const description = yup
  .string()
  .min(3, 'La descripción debe tener mínimo 3 caracteres')
  .max(200, 'La descripción debe tener máximo 200 caracteres');
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
const contact = yup
  .string()
  .max(20, 'El número de contacto debe tener máximo 20 caracteres');
const total = yup
  .number()
  .typeError('Debe ingresar un número')
  .min(10000, 'El valor mínimo es de $10.000');
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
const sale_status = yup
  .string()
  .oneOf(
    [
      Enum_Sale_status.CANCELADA,
      Enum_Sale_status.PAGADA,
      Enum_Sale_status.PENDIENTE,
    ],
    'El estado no es válido'
  );
const price = yup
  .number()
  .typeError('El precio debe ser un número')
  .positive('El precio debe ser un número positivo');
const amount = yup
  .number()
  .typeError('La cantidad debe ser un número')
  .positive('La cantidad debe ser un número positivo')
  .min(1, 'La cantidad mínima es 1');
const subtotal = yup
  .number()
  .typeError('El subtotal debe ser un número')
  .positive('El subtotal debe ser un número positivo');
const category = yup
  .object()
  .shape({
    name: names.required('El nombre de la categoría es obligatorio'),
    category_id: mongoId.required('El id de la categoría es obligatorio'),
  })
  .typeError('Debe ingresar un objeto de tipo CATEGORÍA');

const sale_detail = yup
  .object()
  .shape({
    product: yup
      .object()
      .shape({
        product_id: yup
          .number()
          .typeError('El id del producto debe ser un número')
          .positive('El id del producto debe ser un número positivo')
          .integer('El id del producto debe ser un número entero')
          .required('El id número del producto es obligatorio'),
        product_mongo_id: mongoId.required('El id del producto es obligatorio'),
        brand: yup
          .object()
          .shape({
            name: names.required('El nombre de la marca es obligatorio'),
            brand_id: mongoId.required('El id de la marca es obligatorio'),
          })
          .typeError('Debe ingresar un objeto de tipo MARCA')
          .required('La marca es obligatoria'),
        categories: yup
          .array()
          .of(category)
          .min(1, 'El producto debe tener por lo menos una categoría')
          .required('Debe ingresar por lo menos una categoría')
          .required('Las categorías son obligatorias'),
        name: names.required('El nombre del producto es obligatorio'),
        description,
        stock: yup
          .number()
          .typeError('El id del producto debe ser un número')
          .positive('El id del producto debe ser un número positivo')
          .integer('El id del producto debe ser un número entero')
          .required('El stock del producto es obligatorio'),
        initial_price: price.required(
          'El precio inicial del producto es obligatorio'
        ),
      })
      .typeError('Debe ingresar un objeto de tipo PRODUCTO'),
    price: price.required('El precio de venta es obligatorio'),
    amount: amount.required('La cantidad es obligatoria'),
    subtotal: subtotal.required('El subtotal es obligatorio'),
  })
  .typeError('Debe ingresar un objeto de tipo DETALLE VENTA');

export const createSaleSchema = yup.object().shape({
  user: yup
    .object()
    .shape({
      names: names.required('El nombre del vendedor es obligatorio'),
      code: code.required('El código del vendedor es obligatorio'),
      email: email.required('El correo del vendedor es obligatorio'),
      role: role.required('El rol del vendedor es obligatorio'),
      user_id: mongoId.required('El id del vendedor es obligatorio'),
    })
    .typeError('Debe ingresar un objeto de tipo USUARIO')
    .required('El vendedor es obligatorio'),
  customer: yup
    .object()
    .shape({
      name: names,
      code,
      email,
      contact,
      customer_id: mongoId,
    })
    .typeError('Debe ingresar un objeto de tipo CLIENTE')
    .nullable(),
  sale_location: yup
    .object()
    .shape({
      name: names.required('El nombre del local es obligatorio'),
      description: description.required(
        'La descripción del local es obligatoria'
      ),
      sale_location_id: mongoId.required('El id del local es obligatorio'),
    })
    .typeError('Debe ingresar un objeto de tipo LOCAL'),
  total: total.required('El total es obligatorio'),
  payment_method: yup
    .object()
    .shape({
      name: names.required('El nombre del método de pago es obligatorio'),
      payment_method_id: mongoId.required(
        'El id del método de pago es obligatorio'
      ),
    })
    .typeError('Debe ingresar un objeto de tipo MÉTODO DE PAGO'),
  sale_status: sale_status.required('El estado es obligatorio'),
  registration_date: registration_date.required(
    'La fecha de registro es obligatoria'
  ),
  sale_detail: yup
    .array()
    .of(sale_detail)
    .min(1, 'La venta debe tener por lo menos un producto')
    .required('Debe ingresar el detalle de venta'),
});

export const readSales = yup.object().shape({
  sale_status,
});

export const getSalesByUserSchema = yup.object().shape({
  user_id: mongoId.required('El id del usuario es obligatorio'),
  sale_status,
});

export const getSalesByCustomerSchema = yup.object().shape({
  customer_id: mongoId.required('El id del cliente es obligatorio'),
  sale_status,
});

export const cancelSaleSchema = yup.object().shape({
  sale_id: mongoId.required('El id de la venta es obligatorio'),
});
