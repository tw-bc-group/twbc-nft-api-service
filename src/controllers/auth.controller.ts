import { NextFunction, Request, Response } from 'express';
import { NftUserDto } from '@dtos/nftUsers.dto';
import AuthService from '@services/auth.service';
import ResultService from '@services/result.service';

class AuthController {
  public authService = new AuthService();
  public resultService = new ResultService();
  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const username = String(req.params.username);
      const password = String(req.params.password);

      console.log('username:' + username + ', password:' + password);
      const nftUserDto = new NftUserDto(username, password);

      const { tokenData, cookie, userInfo } = await this.authService.login(nftUserDto);

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json(this.resultService.toSuccess({ ...userInfo, token: tokenData.token }));
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
