import { NextFunction, Request, Response } from 'express';
import fileService from '@services/file.service';

class FileController {

  private fileService = new fileService();

  public getPresignedUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contentType = req.query.contentType as string;
      const data = await this.fileService.getPresignedUrl(contentType);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default FileController;
