import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import bcrypt from 'bcrypt';

class AuthService {
  public users = DB.Users;

  public async login(userData: { email: string; password: string }): Promise<{ tokenData: TokenData; userInfo: { id: number; email: string } }> {
    const findUser = await this.users.findOne({
      where: {
        email: userData.email,
      },
    });
    if (!findUser) {
      throw new HttpException(401, 'Email or password are not correct');
    }
    const match = await bcrypt.compare(userData.password, findUser.password);
    if (!match) {
      throw new HttpException(401, 'Email or password are not correct');
    }
    const tokenData = this.createToken(findUser);
    return { tokenData, userInfo: { id: findUser.id, email: findUser.email } };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id, email: user.email };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthService;
