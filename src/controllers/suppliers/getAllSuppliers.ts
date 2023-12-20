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
    const { active } = req.query;

    let suppliers;
    if (active) {
      suppliers = await Supplier.find({ active });
    } else {
      suppliers = await Supplier.find();
    }

    const allSuppliers = suppliers.map((supplier) => ({
      id: supplier._id,
      name: supplier.name,
      code: supplier.code,
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
