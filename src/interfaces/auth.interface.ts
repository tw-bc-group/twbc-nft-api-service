import { Request } from 'express';
import { User } from '@prisma/client';
import { Wallet } from '@interfaces/wallets.interface';

export interface DataStoredInToken {
  id: number;
  email: String;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: User;
  wallet: Wallet;
}
