import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@prisma/client';
import { isEmpty } from '@utils/util';
import { Client } from '@irita/irita-sdk';
import { client } from '@clients/nft';

class UserService {
  public users = DB.user;
  public wallets = DB.wallet;

  nftClient: Client;

  constructor(nftClient?: Client) {
    this.nftClient = nftClient ?? client;
  }

  public async findUserById(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const findUser: User = await this.users.findFirst({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ data: { email: userData.email, password: hashedPassword } });
    const userId = createUserData.id;
    // await client.keys.add(userId.toString(), config.irita.keystorePassword);
    return createUserData;
  }

  public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ data: { ...userData, password: hashedPassword }, where: { id: userId } });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const updateUser: User = await this.users.findUnique({ where: { id: userId } });
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, "You're not userId");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const findUser: User = await this.users.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "You're not user");

    await this.users.delete({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
