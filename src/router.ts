import type {Handler} from 'express';
import {Router} from 'express';
import FileController from '@controllers/file.controller';
import IndexController from '@controllers/index.controller';
import UsersController from '@controllers/users.controller';

import validationMiddleware from '@/middlewares/validation.middleware';

import {PresignedUrlDto} from '@/dtos/file/presignedUrl.dto';
import {CreateUserDto} from '@dtos/users.dto';

const router = Router();

const fileController = new FileController();
const indexController = new IndexController();
const usersController = new UsersController();

interface Route {
  method: string;
  path: string;
  handlers: Handler[];
}

const routes: Route[] = [
  //file
  { method: 'get', path: '/file/presigned-url', handlers: [validationMiddleware(PresignedUrlDto, 'query'), fileController.getPresignedUrl] },

  //index
  { method: 'get', path: '/', handlers: [indexController.index] },

  //users
  { method: 'get', path: '/users', handlers: [usersController.getUsers] },
  { method: 'post', path: '/users', handlers: [validationMiddleware(CreateUserDto, 'body'), usersController.createUser] },
  { method: 'get', path: '/users/:id(\\d+)', handlers: [usersController.getUserById] },
  { method: 'put', path: '/users/:id(\\d+)', handlers: [validationMiddleware(CreateUserDto, 'body', true), usersController.updateUser] },
  { method: 'delete', path: '/users/:id(\\d+)', handlers: [usersController.deleteUser] },
];

routes.forEach(r => router[r.method](r.path, ...r.handlers));

export default router;
