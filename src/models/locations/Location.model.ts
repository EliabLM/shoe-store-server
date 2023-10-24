import { ILocation } from '../../interfaces';
import { Schema, model } from 'mongoose';

const locationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Brand = model('Location', locationSchema, 'locations');
export default Brand;
