import { Router } from 'express';

// Controllers
import {
  createUser,
  signIn,
  deleteUser,
  updateUser,
  getAllUsers,
  disableUser,
} from '@controllers/users';

// Middlewares
import { validatorHandler } from '@middlewares/index';

// Schemas
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
} from './users.schemas';

export const usersRouter = Router();

// Create user
usersRouter.post(
  '/create-user',
  validatorHandler(createUserSchema, 'body'),
  createUser
);

// Read users
usersRouter.get('/get-users', getAllUsers);

// Update user
usersRouter.put(
  '/update-user',
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

// Delete user
usersRouter.delete('/delete-user', deleteUser);

// #########################################################

// Authenticate user
usersRouter.post('/login', validatorHandler(loginSchema, 'body'), signIn);

// Disable user
usersRouter.patch('/disable-user', disableUser);
