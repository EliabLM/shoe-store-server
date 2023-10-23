import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Supplier from '@models/supplier/Supplier.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    try {
      await Supplier.findById(id);
    } catch (error) {
      throw boom.notFound('El proveedor no existe');
    }

    const newSupplier = {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      active: req.body.active,
    };

    const updatedSupplier = await Supplier.findByIdAndUpdate(id, newSupplier, {
      new: true,
    });

    const resSupplierUpdated: IResponse = {
      statusCode: 200,
      message: 'Proveedor actualizado exitosamente',
      data: updatedSupplier,
    };

    res.json(resSupplierUpdated);
  } catch (error) {
    next(error);
  }
};
