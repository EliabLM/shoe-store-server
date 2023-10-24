import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Models
import Supplier from '@models/supplier/Supplier.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const deleteSupplier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { supplier_id } = req.query;

    if (!supplier_id) {
      throw boom.badRequest('El id del proveedor es obligatorio');
    }

    const supplier = await Supplier.findById(supplier_id);
    if (!supplier) throw boom.notFound('No existe el proveedor');

    await Supplier.findByIdAndDelete(supplier_id);

    const resDeleteSupplier: IResponse = {
      statusCode: 200,
      message: 'Proveedor eliminado exitosamente',
      data: null,
    };

    res.json(resDeleteSupplier);
  } catch (error) {
    next(error);
  }
};
