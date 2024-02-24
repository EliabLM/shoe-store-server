import { IProduct } from '../../interfaces';
import { Schema, model } from 'mongoose';

const productSchema = new Schema<IProduct>(
  {
    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: [true, 'La marca es obligatoria'],
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
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
    price: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

productSchema.path('categories').validate(function (value) {
  return value && value.length > 0;
}, 'Debe haber al menos una categoría');

const Product = model('Product', productSchema, 'products');
export default Product;
