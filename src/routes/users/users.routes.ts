import { Router } from 'express';

// Controllers
import {
  createUser,
  signIn,
  deleteUser,
  updateUser,
  getAllUsers,
  updateUserState,
} from '@controllers/users';

// Middlewares
import { validatorHandler } from '@middlewares/index';

// Schemas
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
  readUsersSchema,
  updateUserStateSchema,
  deleteUserSchema,
} from './users.schemas';

export const usersRouter = Router();

// Create user
usersRouter.post(
  '/create-user',
  validatorHandler(createUserSchema, 'body'),
  createUser
);

// Read users
usersRouter.get(
  '/get-users',
  validatorHandler(readUsersSchema, 'query'),
  getAllUsers
);

// Update user
usersRouter.put(
  '/update-user',
  validatorHandler(updateUserSchema, 'body'),
  updateUser
);

// Delete user
usersRouter.delete(
  '/delete-user',
  validatorHandler(deleteUserSchema, 'query'),
  deleteUser
);

// #########################################################

// Authenticate user
usersRouter.post('/login', validatorHandler(loginSchema, 'body'), signIn);

// Update user state
usersRouter.patch(
  '/update-user-state',
  validatorHandler(updateUserStateSchema, 'query'),
  updateUserState
);
