import { IBrand } from '../../interfaces';
import { Schema, model } from 'mongoose';

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Brand = model('Brand', brandSchema, 'brands');
export default Brand;
