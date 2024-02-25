import { Enum_Sale_status, Enum_Rol, ISale } from '../../interfaces';
import { Schema, model } from 'mongoose';

const saleSchema = new Schema<ISale>(
  {
    user: {
      names: {
        type: String,
        required: [true, 'Los nombres del vendedor son obligatorios'],
        trim: true,
      },
      code: {
        type: String,
        required: [true, 'El código del vendedor es obligatorio'],
        trim: true,
        minlength: 6,
        maxlength: 6,
      },
      email: {
        type: String,
        required: [true, 'El correo del vendedor es obligatorio'],
        trim: true,
        lowercase: true,
      },
      role: {
        type: String,
        enum: Enum_Rol,
        default: Enum_Rol.VENDEDOR,
      },
      user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id del vendedor es obligatorio'],
      },
    },
    customer: {
      name: {
        type: String,
        trim: true,
        lowercase: true,
      },
      code: {
        type: String,
        trim: true,
        minlength: 6,
        maxlength: 6,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
      contact: {
        type: String,
        trim: true,
      },
      customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
      },
    },
    total: {
      type: Number,
      required: [true, 'El total es obligatorio'],
    },
    payment_method: {
      name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        lowercase: true,
        trim: true,
      },
      payment_method_id: {
        type: Schema.Types.ObjectId,
        ref: 'PaymentMethod',
        required: [true, 'El método de pago es obligatorio'],
      },
    },
    registration_date: {
      type: String,
      required: [true, 'La fecha de registro es obligatoria'],
    },
    sale_location: {
      name: {
        type: String,
        required: [true, 'El nombre del local es obligatorio'],
        lowercase: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      sale_location_id: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: [true, 'El id del local es obligatorio'],
      },
    },
    sale_status: {
      type: String,
      enum: Enum_Sale_status,
      required: [true, 'El estado de la venta es obligatorio'],
    },
    sale_detail: [
      {
        price: {
          type: Number,
          required: [true, 'El precio de venta es obligatorio'],
        },
        amount: {
          type: Number,
          required: [true, 'La cantidad es obligatoria'],
        },
        subtotal: {
          type: Number,
          required: [true, 'El subtotal es obligatorio'],
        },
        product: {
          product_id: {
            type: Number,
            required: [true, 'El id numérico del producto es obligatorio'],
          },
          product_mongo_id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'El id del producto es obligatorio'],
          },
          brand: {
            name: {
              type: String,
              required: [true, 'El nombre de la marca es obligatorio'],
              lowercase: true,
              trim: true,
            },
            brand_id: {
              type: Schema.Types.ObjectId,
              ref: 'Brand',
              required: [true, 'El id de la marca es obligatorio'],
            },
          },
          categories: [
            {
              name: {
                type: String,
                required: [true, 'El nombre de la categoría es obligatorio'],
                lowercase: true,
                trim: true,
              },
              category_id: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: [true, 'El id de la categoría es obligatorio'],
              },
            },
          ],
          name: {
            type: String,
            required: [true, 'El nombre del producto es obligatorio'],
            lowercase: true,
            trim: true,
          },
          description: {
            type: String,
            trim: true,
            default: '',
          },
          stock: {
            type: Number,
            default: 0,
          },
          initial_price: {
            type: Number,
            required: [true, 'El precio inicial del producto es obligatorio'],
          },
        },
      },
    ],
  },
  { timestamps: true }
);

saleSchema.path('sale_detail').validate(function (value) {
  return value && value.length > 0;
}, 'Debe haber al menos un producto');

const Sale = model('Sale', saleSchema, 'sales');
export default Sale;
