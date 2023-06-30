import { ICreditor } from 'interfaces';
import { Schema, model } from 'mongoose';

const creditorSchema = new Schema<ICreditor>({
  name: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    unique: true,
  },
  contact: {
    type: String,
    default: '',
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Acreedor = model('Acreedor', creditorSchema, 'acreedores');
export default Acreedor;
