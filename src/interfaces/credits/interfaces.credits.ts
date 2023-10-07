import { Types } from 'mongoose';

export interface ICredit {
  creditor: Types.ObjectId;
  initialValue: number;
  creationDate: string;
  interestRate: string;
  active: boolean;
}
