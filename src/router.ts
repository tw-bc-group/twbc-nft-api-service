import type { Handler } from 'express';
import { Router } from 'express';
import FileController from '@controllers/file.controller';
import validationMiddleware from '@/middlewares/validation.middleware';
import { PresignedUrlDto } from '@/dtos/file/presignedUrl.dto';

const router = Router();

const fileController = new FileController();

interface Route {
  method: string;
  path: string;
  handlers: Handler[];
}

const routes: Route[] = [
  //file
  { method: 'get', path: '/file/presigned-url', handlers: [validationMiddleware(PresignedUrlDto, 'query'), fileController.getPresignedUrl] },

  // //index
  // { method: 'get', path: '/', handlers: [indexController.index] },
];

routes.forEach(r => router[r.method](r.path, ...r.handlers));

export default router;
