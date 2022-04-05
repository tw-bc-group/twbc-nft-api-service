import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.path === '/login') {
      return next();
    }

    const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;

    if (Authorization) {
      // const verificationResponse = verify(Authorization, SECRET_KEY) as DataStoredInToken;
      // const userId = verificationResponse.id;
      const userId = Authorization;
      const findUser = await DB.user.findUnique({ where: { id: Number(userId) } });

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      // next(new HttpException(401, 'Authentication token missing'));
      next();
    }
  } catch (error) {
    // next(new HttpException(401, 'Wrong authentication token'));
    next(new HttpException(500, 'service error: ' + error));
  }
};

export default authMiddleware;
