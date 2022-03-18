import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import DB from '@databases';
import { NftUserDto } from '@dtos/nftUsers.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';

class AuthService {
  public users = DB.Users;

  public async login(userData: NftUserDto): Promise<{ tokenData: TokenData; cookie: string; userInfo: any }> {
    const tokenData = this.createToken(userData);
    const cookie = this.createCookie(tokenData);

    // mock
    const userInfo = { name: '管理员', username: userData.username, mail: '123@thoughtworks.com' };

    return { tokenData, cookie, userInfo };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public createToken(user: NftUserDto): TokenData {
    const dataStoredInToken: DataStoredInToken = { username: user.username };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
