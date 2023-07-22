import { Local, Rol } from 'types';
import { Types } from 'mongoose';

export interface User {
  nombre: string;
  password: string;
  email: string;
  rol: Rol;
  local: Local;
  activo: boolean;
  hasPassword: boolean;
}

export interface ICreditor {
  name: string;
  contact: string;
  active: boolean;
}

export interface ICredit {
  creditor: Types.ObjectId;
  initialValue: number;
  creationDate: string;
  interestRate: string;
  active: boolean;
}

export interface IResponse {
  statusCode: number;
  message: string;
  data: object | null | undefined;
}

export interface IGenericError {
  statusCode: number;
  error: string | undefined;
  message: string;
  stack?: string;
}
