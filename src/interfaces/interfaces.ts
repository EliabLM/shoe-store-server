import { Types } from 'mongoose';
import { Payment_method, Role, Sale_status } from 'types';

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

// Products
export interface IProduct {
  brand: Types.ObjectId;
  categories: Types.ObjectId[];
  name: string;
  description?: string;
  stock?: number;
  price: number;
  active: boolean;
}

// Sales
export interface ISale {
  user: Types.ObjectId;
  customer: Types.ObjectId;
  total: number;
  payment_method: Payment_method;
  sale_status: Sale_status;
}

export enum Enum_Payment_methods {
  'Efectivo' = 'Efectivo',
  'Bancolombia' = 'Bancolombia',
  'Nequi' = 'Nequi',
  'Daviplata' = 'Daviplata',
  'Banco_de_bogota' = 'Banco de Bogota',
  'Davivienda' = 'Davivienda',
}

export enum Enum_Sale_status {
  PAGADA = 'PAGADA',
  PENDIENTE = 'PENDIENTE',
  CANCELADA = 'CANCELADA',
}

// Sales details
export interface ISaleDetail {
  sale: Types.ObjectId;
  product: Types.ObjectId;
  price: number;
  amount: number;
  subtotal: number;
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
