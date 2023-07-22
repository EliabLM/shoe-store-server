import { Schema, model } from 'mongoose';
import { ICredit } from 'interfaces';

const creditSchema = new Schema<ICredit>(
  {
    creditor: {
      type: Schema.Types.ObjectId,
      ref: 'Creditor',
    },
    initialValue: {
      type: Number,
      required: [true, 'El valor inicial es obligatorio'],
    },
    creationDate: {
      type: String,
      required: [true, 'La fecha de creación es obligatoria'],
      trim: true,
    },
    interestRate: {
      type: String,
      required: [true, 'La tasa de interés es obligatoria'],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Credit = model('Credit', creditSchema, 'creditos');
export default Credit;
