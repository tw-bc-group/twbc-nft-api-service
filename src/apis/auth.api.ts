import { NextFunction, Request, Response, Router } from 'express';
import AuthService from '@services/auth.service';
import { HttpException } from '@exceptions/HttpException';

const api = Router();

const authService = new AuthService();

api.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email || !req.body.password) {
      next(new HttpException(404, 'Query email and password are required'));
    }

    const { tokenData, userInfo } = await authService.login({
      email: req.body.email?.toString(),
      password: req.body.password?.toString(),
    });

    res.status(200).json({ ...userInfo, token: tokenData.token });
  } catch (error) {
    next(error);
  }
});

export { api };
