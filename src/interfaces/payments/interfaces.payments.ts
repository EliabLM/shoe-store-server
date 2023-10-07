import { Types } from 'mongoose';

export interface IPayment {
  credit: Types.ObjectId;
  date: string;
  amount: number;
  active: boolean;
}
