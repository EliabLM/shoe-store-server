import { NextFunction, Request, Response } from 'express';

// Model
import Category from '@models/categories/Category.model';

// Interfaces
import { IResponse } from '../../interfaces';

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { active } = req.query;

    let categories;
    if (active) {
      categories = await Category.find({ active });
    } else {
      categories = await Category.find();
    }

    const allCategories = categories.map((category) => ({
      id: category._id,
      name: category.name,
      active: category.active,
    }));

    const resCategories: IResponse = {
      statusCode: 200,
      message: 'Operación realizada exitosamente',
      data: allCategories,
    };

    res.json(resCategories);
  } catch (error) {
    next(error);
  }
};
