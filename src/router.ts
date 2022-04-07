import type { Handler } from 'express';
import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import FileController from '@controllers/file.controller';
import IndexController from '@controllers/index.controller';
import NftController from '@controllers/nft.controller';
import UsersController from '@controllers/users.controller';

import validationMiddleware from '@/middlewares/validation.middleware';

import { PresignedUrlDto } from '@/dtos/file/presignedUrl.dto';
import { CreateNftDto } from '@dtos/nft/createnft.dto';
import { TransferNftDto } from '@dtos/nft/transfernft.dto';
import { CreateUserDto } from '@dtos/users.dto';

const router = Router();

const fileController = new FileController();
const indexController = new IndexController();
const nftController = new NftController();
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

  // nft
  { method: 'get', path: '/nft', handlers: [nftController.getNfts] },
  { method: 'post', path: '/nft', handlers: [validationMiddleware(CreateNftDto, 'body'), nftController.createNft] },
  { method: 'post', path: '/nft/transfer', handlers: [validationMiddleware(TransferNftDto, 'body'), nftController.transferNft] },
  { method: 'get', path: '/nft/transfered', handlers: [nftController.getTransferedNft] },
  { method: 'get', path: '/nft/:denomId/:id', handlers: [nftController.getNftById] },

  //users
  { method: 'get', path: '/users', handlers: [usersController.getUsers] },
  { method: 'post', path: '/users', handlers: [validationMiddleware(CreateUserDto, 'body'), usersController.createUser] },
  { method: 'get', path: '/users/:id(\\d+)', handlers: [usersController.getUserById] },
  { method: 'put', path: '/users/:id(\\d+)', handlers: [validationMiddleware(CreateUserDto, 'body', true), usersController.updateUser] },
  { method: 'delete', path: '/users/:id(\\d+)', handlers: [usersController.deleteUser] },
];

routes.forEach(r => router[r.method](r.path, ...r.handlers));

export default router;
