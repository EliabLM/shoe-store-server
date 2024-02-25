import { NextFunction, Request, Response } from 'express';
import boom from '@hapi/boom';

// Model
import Category from '@models/categories/Category.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body;

  try {
    const category = await Category.findById(id);
    if (!category) throw boom.notFound('La categoría no existe');

    const categoryName = await Category.findOne({ name });
    if (categoryName && !category._id.equals(categoryName._id)) {
      throw boom.badRequest('Ya existe una categoría con el nombre ingresado');
    }

    const newCategory = {
      name: req.body.name,
      active: req.body.active,
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, newCategory, {
      new: true,
    });

    const resCategoryUpdated: IResponse = {
      statusCode: 200,
      message: 'Categoría actualizada exitosamente',
      data: updatedCategory,
    };

    res.json(resCategoryUpdated);
  } catch (error) {
    next(error);
  }
};
