import { NextFunction, Request, Response } from 'express';
import AuthService from '@services/auth.service';
import ResultService from '@services/result.service';
import { HttpException } from '@exceptions/HttpException';

class AuthController {
  public authService = new AuthService();
  public resultService = new ResultService();
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.body.email || !req.body.password) {
        next(new HttpException(404, 'Query email and password are required'));
      }

      const { tokenData, userInfo } = await this.authService.login({
        email: req.body.email?.toString(),
        password: req.body.password?.toString(),
      });

      res.status(200).json(this.resultService.toSuccess({ ...userInfo, token: tokenData.token }));
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
