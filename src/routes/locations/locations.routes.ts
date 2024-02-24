import { Router } from 'express';

// Controllers
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  updateLocation,
} from '@controllers/locations';

// Middlewares
import { validatorHandler } from '@middlewares/validator.handler';

// Schemas
import {
  createLocationSchema,
  updateLocationSchema,
  readLocationsSchema,
  deleteLocationSchema,
} from './locations.schema';

export const locationsRouter = Router();

// Create location
locationsRouter.post(
  '/create-location',
  validatorHandler(createLocationSchema, 'body'),
  createLocation
);

// Read locations
locationsRouter.get(
  '/get-locations',
  validatorHandler(readLocationsSchema, 'query'),
  getAllLocations
);

// Update location
locationsRouter.put(
  '/update-location',
  validatorHandler(updateLocationSchema, 'body'),
  updateLocation
);

// Delete location
locationsRouter.delete(
  '/delete-location',
  validatorHandler(deleteLocationSchema, 'query'),
  deleteLocation
);
