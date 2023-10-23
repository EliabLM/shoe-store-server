import { NextFunction, Request, Response } from 'express';

// Model
import Supplier from '@models/supplier/Supplier.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllSuppliers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const suppliers = await Supplier.find();

    const allSuppliers = suppliers.map((supplier) => ({
      id: supplier._id,
      name: supplier.name,
      contact: supplier.contact ?? '',
      email: supplier.email ?? '',
      active: supplier.active,
    }));

    const resSuppliers: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allSuppliers,
    };

    res.json(resSuppliers);
  } catch (error) {
    next(error);
  }
};
