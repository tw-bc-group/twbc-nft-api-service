import { Router } from 'express';
import FileController from '@controllers/file.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { PresignedUrlDto } from '@/dtos/file/presignedUrl.dto';

class FileRoute implements Routes {
  public path = '/file';
  public router = Router();
  public fileController = new FileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/presigned-url`, validationMiddleware(PresignedUrlDto, 'query'), this.fileController.getPresignedUrl);
  }
}

export default FileRoute;
