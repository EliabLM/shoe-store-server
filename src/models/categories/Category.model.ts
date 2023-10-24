import { ICategory } from '../../interfaces';
import { Schema, model } from 'mongoose';

const categorySchema = new Schema<ICategory>(
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

const Category = model('Category', categorySchema, 'categories');
export default Category;
