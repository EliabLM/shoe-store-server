import { Types } from 'mongoose';
import { Purchase_status, Role, Sale_status } from 'types';

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
  code: string;
  email?: string;
  contact?: string;
  active: boolean;
}

// Customer
export interface ICustomer {
  name: string;
  code: string;
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

export interface IPaymentMethods {
  name: string;
  active: boolean;
}

// Products
export interface IProduct {
  product_id: number;
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
  user: {
    names: string;
    code: string;
    password: string;
    email: string;
    role: Role;
    user_id: Types.ObjectId;
  };
  customer?: {
    name: string;
    code: string;
    email?: string;
    contact?: string;
    customer_id: Types.ObjectId;
  };
  sale_location: {
    name: string;
    description: string;
    sale_location_id: Types.ObjectId;
  };
  total: number;
  payment_method: {
    name: string;
    payment_method_id: Types.ObjectId;
  };
  sale_status: Sale_status;
  registration_date: string;
  sale_detail: {
    product: {
      product_mongo_id: Types.ObjectId;
      product_id: number;
      brand: {
        name: string;
        brand_id: Types.ObjectId;
      };
      categories: { name: string; category_id: Types.ObjectId }[];
      name: string;
      description?: string;
      stock?: number;
      initial_price: number;
    };
    price: number;
    amount: number;
    subtotal: number;
  }[];
}

export enum Enum_Sale_status {
  PAGADA = 'PAGADA',
  PENDIENTE = 'PENDIENTE',
  CANCELADA = 'CANCELADA',
}

// Purchases
export interface IPurchase {
  user: Types.ObjectId;
  supplier: Types.ObjectId;
  total: number;
  purchase_status?: Purchase_status;
  expiration_date: string;
  registration_date: string;
}

export enum Enum_purchase_status {
  PAGADA = 'PAGADA',
  PENDIENTE = 'PENDIENTE',
  CANCELADA = 'CANCELADA',
  VENCIDA = 'VENCIDA',
}

export interface IPurchaseDetail {
  purchase: Types.ObjectId;
  product: Types.ObjectId;
  price: number;
  amount: number;
  subtotal: number;
}

export interface IPurchasePayment {
  purchase: Types.ObjectId;
  registration_date: string;
  amount: number;
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
