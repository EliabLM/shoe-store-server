import { Types } from 'mongoose';
import { Local, Rol } from 'types';

// User
export interface User {
  nombre: string;
  password: string;
  email: string;
  rol: Rol;
  local: Local;
  activo: boolean;
  hasPassword: boolean;
}

export enum Enum_Rol {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  VENDEDOR = 'vendedor',
}

export enum Enum_Local {
  LOCAL1 = 'LOCAL1',
  LOCAL2 = 'LOCAL2',
  LOCAL3 = 'LOCAL3',
  LOCAL4 = 'LOCAL4',
}

// Supplier
export interface ISupplier {
  name: string;
  email?: string;
  contact?: string;
  active: boolean;
}

// Customer
export interface ICustomer {
  name: string;
  email?: string;
  contact?: string;
  active: boolean;
}

// Brand
export interface IBrand {
  name: string;
  active: boolean;
}

// Locations
export interface ILocation {
  name: string;
  description: string;
  active: boolean;
}

// #####################################
// Creditor
export interface ICreditor {
  name: string;
  contact: string;
  active: boolean;
}

// Credits
export interface ICredit {
  creditor: Types.ObjectId;
  initialValue: number;
  creationDate: string;
  interestRate: string;
  active: boolean;
}

// Payments
export interface IPayment {
  credit: Types.ObjectId;
  date: string;
  amount: number;
  active: boolean;
}

// General
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
