import { ISaleDetail } from '../../interfaces';
import { Schema, model } from 'mongoose';

const saleDetailSchema = new Schema<ISaleDetail>(
  {
    sale: {
      type: Schema.Types.ObjectId,
      ref: 'Sale',
      required: [true, 'El id de la venta es obligatorio'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'El id del producto es obligatorio'],
    },
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
  },
  { timestamps: true }
);

const SaleDetail = model('SaleDetail', saleDetailSchema, 'sales_detail');
export default SaleDetail;
