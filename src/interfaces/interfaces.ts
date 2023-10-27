import { Types } from 'mongoose';
import { Role } from 'types';

// User
export interface User {
  names: string;
  code: string;
  password: string;
  email: string;
  role: Role;
  location: Types.ObjectId;
  active: boolean;
}

export enum Enum_Rol {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  VENDEDOR = 'vendedor',
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

// Categories
export interface ICategory {
  name: string;
  active: boolean;
}

export interface IProduct {
  brand: Types.ObjectId;
  categories: Types.ObjectId[];
  name: string;
  description?: string;
  price: number;
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

// ####################################
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
